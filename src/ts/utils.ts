import { range } from './generators';

/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```ts
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index: number, boardSize: number): string {
	switch (true) {
		case index === 0:
			return 'top-left';
		case index === boardSize - 1:
			return 'top-right';
		case index === boardSize ** 2 - boardSize:
			return 'bottom-left';
		case index === boardSize ** 2 - 1:
			return 'bottom-right';
		case range(1, boardSize - 1).includes(index):
			return 'top';
		case range(boardSize ** 2 - boardSize + 1, boardSize ** 2 - 1).includes(index):
			return 'bottom';
		case range(boardSize, boardSize ** 2 - boardSize, boardSize).includes(index):
			return 'left';
		case range(boardSize * 2 - 1, boardSize ** 2 - 1, boardSize).includes(index):
			return 'right';
		default:
			return 'center';
	}
}

export function calcHealthLevel(health: number) {
	if (health < 15) {
		return 'critical';
	}

	if (health < 50) {
		return 'normal';
	}

	return 'high';
}
