import { writable } from 'svelte/store';

import { months } from '../lib/months';

export const goals = months.map(() => writable(''));
