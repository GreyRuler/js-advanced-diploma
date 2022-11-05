import PositionedCharacter from './PositionedCharacter';

export default class GameState {
	static from({ characters, theme }: { theme: string, characters: PositionedCharacter[] }) {
		return {
			theme,
			characters
		};
	}
}
