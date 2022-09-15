import { writable } from 'svelte/store';

import { goals } from './goals';

// Focus January by default
export const selected = writable(goals[9]);
