import Character from './Character';

/**
 * Класс, представляющий персонажей команды
 *
 * Например
 * @example
 * ```ts
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
	private readonly _characters: Array<Character>;

	constructor(characters: Array<Character>) {
		this._characters = characters;
	}

	get characters(): Array<Character> {
		return this._characters;
	}
}
