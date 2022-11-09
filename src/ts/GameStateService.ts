import PositionedCharacter from './PositionedCharacter';
import GamePlay from './GamePlay';
import { characterToClassType, positionedCharacterToClassType } from './utils';
import Character from './Character';

export default class GameStateService {
	private storage: Storage;

	constructor(storage: Storage) {
		this.storage = storage;
	}

	save(state: Object) {
		this.storage.setItem('state', JSON.stringify(state));
	}

	load(): {
		theme: string,
		characters: PositionedCharacter[],
		userTeam: Character[]
	} | undefined {
		try {
			const storageObject = JSON.parse(this.storage.getItem('state') ?? '');
			// eslint-disable-next-line max-len
			const characters: PositionedCharacter[] = storageObject.characters.map((item: PositionedCharacter) => positionedCharacterToClassType(item));
			// eslint-disable-next-line max-len
			const userTeam: Character[] = storageObject.userTeam.map((item: Character) => characterToClassType(item));
			return {
				theme: storageObject.theme,
				characters,
				userTeam
			};
		} catch (e) {
			GamePlay.showError('У Вас нет сохранений');
			return undefined;
		}
	}
}
