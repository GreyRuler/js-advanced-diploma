import GamePlay from './GamePlay';
import GameStateService from './GameStateService';
import themes from './themes';
import Bowman from './characters/ally/Bowman';
import Magician from './characters/ally/Magician';
import Swordsman from './characters/ally/Swordsman';
import Daemon from './characters/enemy/Daemon';
import Undead from './characters/enemy/Undead';
import Vampire from './characters/enemy/Vampire';
import { generateTeam, randomPosition, range } from './generators';
import PositionedCharacter from './PositionedCharacter';

export default class GameController {
	private readonly gamePlay: any;

	private stateService: any;

	private positionedCharacters?: PositionedCharacter[];

	constructor(gamePlay: GamePlay, stateService: GameStateService) {
		this.gamePlay = gamePlay;
		this.stateService = stateService;
	}

	init() {
		this.gamePlay.drawUi(themes.prairie);
		const ally = [Bowman, Magician, Swordsman];
		const enemy = [Daemon, Undead, Vampire];
		const countEnemy = 3;
		const countAlly = 3;
		const allies = generateTeam(ally, 4, countAlly);
		const enemies = generateTeam(enemy, 4, countEnemy);

		const { boardSize } = this.gamePlay;

		const positionsAlly = range(0, boardSize * boardSize - boardSize, 8)
			.concat(range(1, boardSize * boardSize - boardSize + 1, 8));
		const positionsEnemy = range(boardSize - 2, boardSize * boardSize - boardSize, 8)
			.concat(range(boardSize - 1, boardSize * boardSize - boardSize, 8));

		const randomPositionsAlly = randomPosition(positionsAlly, countAlly);
		const randomPositionsEnemy = randomPosition(positionsEnemy, countEnemy);

		this.positionedCharacters = allies.characters.map(
			(item, idx) => new PositionedCharacter(item, randomPositionsAlly[idx])
		).concat(enemies.characters.map(
			(item, idx) => new PositionedCharacter(item, randomPositionsEnemy[idx])
		));
		this.gamePlay.redrawPositions(this.positionedCharacters);
		this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
		this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
		this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
		// TODO: load saved stated from stateService
	}

	// eslint-disable-next-line class-methods-use-this
	onCellClick(index: number) {

	}

	onCellEnter(index: number) {
		const character = this.positionedCharacters?.find(
			(positionedCharacter) => positionedCharacter.position === index
		);
		this.gamePlay.showCellTooltip(character?.character.toString(), index);
	}

	onCellLeave(index: number) {
		this.gamePlay.hideCellTooltip(index);
	}
}
