import Character from '../../Character';

export default class Undead extends Character {
	constructor(level: number, type = 'undead') {
		super(level, type);
		this.attack = 40;
		this.defence = 10;
		this.attackRange = 1;
		this.movementRange = 4;
	}
}
