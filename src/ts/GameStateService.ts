import PositionedCharacter from './PositionedCharacter';
import Character from './Character';
import Bowman from './characters/ally/Bowman';
import Magician from './characters/ally/Magician';
import Swordsman from './characters/ally/Swordsman';
import Daemon from './characters/enemy/Daemon';
import Undead from './characters/enemy/Undead';
import Vampire from './characters/enemy/Vampire';
import GamePlay from './GamePlay';

export default class GameStateService {
	private storage: Storage;

	constructor(storage: Storage) {
		this.storage = storage;
	}

	save(state: Object) {
		this.storage.setItem('state', JSON.stringify(state));
	}

	load(): { theme: string, characters: PositionedCharacter[] } | undefined {
		try {
			const storageObject = JSON.parse(this.storage.getItem('state') ?? '');
			const characters = storageObject.characters.map((value: PositionedCharacter) => {
				// eslint-disable-next-line max-len
				const charactersClassesNames: Array<new (level: number) => Character> = [Bowman, Magician, Swordsman, Daemon, Undead, Vampire];
				// eslint-disable-next-line @typescript-eslint/no-shadow,max-len
				const indexClassName = charactersClassesNames.findIndex((className) => className.name.toLowerCase() === value.character.type);
				const character = new charactersClassesNames[indexClassName](value.character.level);
				character.level = value.character.level;
				character.health = value.character.health;
				character.attack = value.character.attack;
				character.defence = value.character.defence;
				return new PositionedCharacter(character, value.position);
			});
			return {
				theme: storageObject.theme,
				characters
			};
		} catch (e) {
			GamePlay.showError('У Вас нет сохранений');
			return undefined;
		}
	}
}
