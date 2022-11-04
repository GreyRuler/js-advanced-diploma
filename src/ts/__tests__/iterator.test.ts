import { expect, test } from '@jest/globals';
import ThemesIterator from '../themes/ThemesIterator';

test('', () => {
	const iterator = new ThemesIterator('prairie');
	iterator.next();
	iterator.next();
	iterator.next();
	iterator.next();
	iterator.next();
	iterator.next();
	iterator.next();
	const last = iterator.next();
	expect('mountain').toBe(last);
});
