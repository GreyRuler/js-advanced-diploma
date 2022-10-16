/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default abstract class Character {
	level: number;

	attack: number;

	defence: number;

	health: number;

	type: string;

	protected constructor(level: number, type: string) {
		this.level = level;
		this.attack = 0;
		this.defence = 0;
		this.health = 50;
		this.type = type;
	}

	toString() {
		return `\u{1F396} ${this.level} \u{2694} ${this.attack} \u{1F6E1} ${this.defence} \u{2764} ${this.health}`;
	}
}
