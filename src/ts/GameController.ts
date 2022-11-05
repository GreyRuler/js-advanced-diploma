import GamePlay from './GamePlay';
import GameStateService from './GameStateService';
import {
	attackRadius, generatePositionedAllies, generatePositionedEnemies, movementRadius
} from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';
import { EnemiesVSAlly } from './type/EnemiesVSAlly';
import { dealDamage, randomElementFromArray } from './utils';
import Character from './Character';
import ThemesIterator from './themes/ThemesIterator';
import GameState from './GameState';

export default class GameController {
	private readonly gamePlay: GamePlay;

	private stateService: GameStateService;

	private positionedCharacters?: PositionedCharacter[];

	private themes: ThemesIterator;

	constructor(gamePlay: GamePlay, stateService: GameStateService) {
		this.gamePlay = gamePlay;
		this.stateService = stateService;
		this.themes = new ThemesIterator('prairie');
	}

	init() {
		this.gamePlay.drawUi(this.themes.currentTheme);
		const { boardSize } = this.gamePlay;

		const positionedAllies = generatePositionedAllies(boardSize);

		const positionedEnemies = generatePositionedEnemies(boardSize);

		this.positionedCharacters = positionedAllies.concat(positionedEnemies);

		this.gamePlay.redrawPositions(this.positionedCharacters);
		this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
		this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
		this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

		this.gamePlay.addNewGameListener(() => this.init());
		this.gamePlay.addSaveGameListener(() => {
			const state = {
				characters: this.positionedCharacters,
				theme: this.themes.currentTheme
			};
			this.stateService.save(state);
		});
		this.gamePlay.addLoadGameListener(() => {
			const state = this.stateService.load();
			if (state) {
				const loadGame = GameState.from(state);
				this.themes = new ThemesIterator(loadGame.theme);
				this.gamePlay.drawUi(this.themes.currentTheme);
				this.positionedCharacters = loadGame.characters;
				this.gamePlay.redrawPositions(this.positionedCharacters);
			}
		});
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
				this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position);
				const damage = dealDamage(
					this.gamePlay.currentCharacter.character,
					positionedCharacter.character
				);
				positionedCharacter.character.health -= damage;
				this.gamePlay.showDamage(index, `${damage}`).then(() => {
					this.deathCharacter(positionedCharacter.character);
					this.gamePlay.redrawPositions(this.positionedCharacters!);
					const enemies = this.enemies();
					this.gamePlay.currentCharacter = undefined;
					this.gamePlay.setCursor(cursors.auto);
					if (enemies && enemies.length) {
						this.attackEnemy();
					} else {
						const allies = this.allies();
						allies?.forEach((ally) => {
							ally.character.levelUP();
						});
						const { boardSize } = this.gamePlay;
						const positionedEnemies = generatePositionedEnemies(boardSize);
						this.positionedCharacters = this.positionedCharacters?.concat(positionedEnemies);
						const nextTheme = this.themes.next();
						if (nextTheme !== 'prairie') {
							this.gamePlay.drawUi(nextTheme);
							this.gamePlay.redrawPositions(this.positionedCharacters!);
						} else {
							this.gamePlay.clearEvents();
						}
					}
				});
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
				if (!this.allies()?.length) {
					this.gamePlay.clearEvents();
				}
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
		if (character.health <= 0) {
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
