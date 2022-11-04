import themes from './themes';

export default class ThemesIterator {
	private index: number;

	private readonly values: string[];

	constructor(currentValue: string) {
		this.values = themes;
		this.index = this.values.indexOf(currentValue);
	}

	next(): string {
		if (this.index === this.values.length) {
			this.index = 0;
		}

		const value = this.values[this.index];
		this.index += 1;
		return value;
	}
}
