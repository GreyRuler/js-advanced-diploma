import GamePlay from './GamePlay';
import GameStateService from './GameStateService';
import themes from './themes';
import Bowman from './characters/ally/Bowman';
import Magician from './characters/ally/Magician';
import Swordsman from './characters/ally/Swordsman';
import Daemon from './characters/enemy/Daemon';
import Undead from './characters/enemy/Undead';
import Vampire from './characters/enemy/Vampire';
import {
	attackRadius, generateTeam, movementRadius, randomPosition, range
} from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';
import { EnemiesVSAlly } from './type/EnemiesVSAlly';
import { dealDamage, levelUP, randomElementFromArray } from './utils';
import Character from './Character';

export default class GameController {
	private readonly gamePlay: GamePlay;

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

	onCellClick(index: number) {
		const positionedCharacter = this.positionedCharacters?.find(
			(character) => character.position === index
		);
		if (positionedCharacter?.character && ['bowman', 'swordsman', 'magician'].includes(positionedCharacter.character.type)) {
			if (this.gamePlay.currentCharacter?.position) {
				this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position);
			}
			this.gamePlay.currentCharacter = positionedCharacter;
			this.gamePlay.selectCell(index);
		} else if (this.gamePlay.currentCharacter) {
			if (attackRadius(
				this.gamePlay.currentCharacter?.position,
				this.gamePlay.currentCharacter?.character.attackRange,
				this.gamePlay.boardSize
			).includes(index)
				&& positionedCharacter?.character
				&& ['daemon', 'undead', 'vampire'].includes(
					positionedCharacter.character.type
				)
			) {
				const damage = dealDamage(
					this.gamePlay.currentCharacter.character,
					positionedCharacter.character
				);
				positionedCharacter.character.health -= damage;
				this.gamePlay.showDamage(index, `${damage}`).then(() => {
					this.deathCharacter(positionedCharacter.character);
					this.gamePlay.redrawPositions(this.positionedCharacters!);
				});
				const enemies = this.enemies();
				this.gamePlay.currentCharacter = undefined;
				this.gamePlay.setCursor(cursors.auto);
				if (enemies && enemies.length) {
					this.attackEnemy();
				} else {
					const allies = this.allies();
					allies?.forEach((ally) => {
						levelUP(ally.character);
					});
				}
			} else if (movementRadius(
				this.gamePlay.currentCharacter?.position,
				this.gamePlay.currentCharacter?.character.movementRange,
				this.gamePlay.boardSize
			).includes(index) && !positionedCharacter?.character
			) {
				this.gamePlay.deselectCell(index);
				this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position);
				this.gamePlay.currentCharacter.position = index;
				this.gamePlay.redrawPositions(this.positionedCharacters!);
				this.gamePlay.currentCharacter = undefined;
				this.gamePlay.setCursor(cursors.auto);
				this.attackEnemy();
			} else {
				GamePlay.showError('Недопустимое действие');
			}
		} else {
			GamePlay.showError('Выберите своего персонажа');
		}
	}

	onCellEnter(index: number) {
		const character = this.positionedCharacters?.find(
			(positionedCharacter) => positionedCharacter.position === index
		)?.character;
		if (character) {
			this.gamePlay.showCellTooltip(character.toString(), index);
		}
		if (this.gamePlay.currentCharacter) {
			if (['bowman', 'swordsman', 'magician'].includes(character?.type ?? '')) {
				this.gamePlay.setCursor(cursors.pointer);
			} else if (['daemon', 'undead', 'vampire'].includes(character?.type ?? '')) {
				if (attackRadius(
					this.gamePlay.currentCharacter?.position,
					this.gamePlay.currentCharacter?.character.attackRange,
					this.gamePlay.boardSize
				).includes(index)) {
					this.gamePlay.setCursor(cursors.crosshair);
					this.gamePlay.selectCell(index, 'red');
				} else {
					this.gamePlay.setCursor(cursors.notallowed);
				}
			} else if (movementRadius(
				this.gamePlay.currentCharacter?.position,
				this.gamePlay.currentCharacter?.character.movementRange,
				this.gamePlay.boardSize
			).includes(index)) {
				this.gamePlay.setCursor(cursors.pointer);
				this.gamePlay.selectCell(index, 'green');
			} else {
				this.gamePlay.setCursor(cursors.notallowed);
			}
		}
	}

	onCellLeave(index: number) {
		this.gamePlay.hideCellTooltip(index);
		if (index !== this.gamePlay?.currentCharacter?.position) {
			this.gamePlay.deselectCell(index);
		}
	}

	attackEnemy() {
		const allies = this.allies();
		const enemies = this.enemies();
		const attackAlly = allies?.reduce((array, ally: PositionedCharacter) => {
			const enemiesAttackers = enemies?.filter((enemy) => {
				const attackPositionsEnemy = attackRadius(
					enemy.position,
					enemy.character.attackRange,
					this.gamePlay.boardSize
				);
				return attackPositionsEnemy.includes(ally.position);
			});
			if (enemiesAttackers?.length) {
				const item: EnemiesVSAlly = [ally, enemiesAttackers];
				array.push(item);
			}
			return array;
		}, <EnemiesVSAlly[]>[]);
		if (attackAlly?.length) {
			const randomAttackAlly = randomElementFromArray(attackAlly);
			const [attackedAlly, attackerEnemies] = randomAttackAlly;
			const attackerEnemy = randomElementFromArray(attackerEnemies);
			const damage = dealDamage(
				attackerEnemy.character,
				attackedAlly.character
			);
			attackedAlly.character.health -= damage;
			this.gamePlay.showDamage(attackedAlly.position, `${damage}`).then(() => {
				this.deathCharacter(attackedAlly.character);
				this.gamePlay.redrawPositions(this.positionedCharacters!);
			});
		} else if (enemies) {
			const randomEnemy = randomElementFromArray(enemies);
			const possiblePositions = movementRadius(
				randomEnemy.position,
				randomEnemy.character.movementRange,
				this.gamePlay.boardSize
			);
			const positionsCharacters = this.positionedCharacters?.map((character) => character.position);
			// eslint-disable-next-line max-len
			const positions = possiblePositions.filter((position) => !positionsCharacters?.includes(position));
			randomEnemy.position = randomElementFromArray(positions);
		}
	}

	deathCharacter(character: Character) {
		if (character.health < 0) {
			// eslint-disable-next-line max-len
			this.positionedCharacters = this.positionedCharacters?.filter((positionedCharacter) => positionedCharacter.character !== character);
		}
	}

	allies() {
		return this.positionedCharacters?.filter((value) => ['bowman', 'swordsman', 'magician'].includes(value.character.type));
	}

	enemies() {
		return this.positionedCharacters?.filter((value) => !['bowman', 'swordsman', 'magician'].includes(value.character.type));
	}
}
