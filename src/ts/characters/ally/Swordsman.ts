import Character from '../../Character';

export default class Swordsman extends Character {
	constructor(level: number, type = 'swordsman') {
		super(level, type);
		this.attack = 40;
		this.defence = 10;
		this.attackRange = 1;
		this.movementRange = 4;
	}
}
