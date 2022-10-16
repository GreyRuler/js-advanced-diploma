import Team from './Team';
import Character from './Character';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(
	allowedTypes: Array<new (level: number) => Character>,
	maxLevel: number
) {
	while (true) {
		const level = Math.ceil(Math.random() * maxLevel);
		const index = Math.floor(Math.random() * allowedTypes.length);
		yield new allowedTypes[index](level);
	}
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 * */
export function generateTeam(
	allowedTypes: Array<new (level: number) => Character>,
	maxLevel: number,
	characterCount: number
): Team {
	const generator = characterGenerator(allowedTypes, maxLevel);
	const characters: Array<Character> = [];
	for (let i = 0; i < characterCount; i++) {
		const character = generator.next().value!;
		characters.push(character);
	}
	return new Team(characters);
}

/**
 * Возвращает последовательность чисел
 */
export function range(start: number, end: number, step: number = 1) {
	const ans = [];
	for (let i = start; i < end; i += step) {
		ans.push(i);
	}
	return ans;
}

export function randomPosition(availablePositions: Array<number>, countPositions: number) {
	const array = [];
	for (let i = 0; i < countPositions; i++) {
		const index = Math.floor(Math.random() * availablePositions.length);
		array.push(availablePositions.splice(index, 1));
	}
	return array.flat();
}
