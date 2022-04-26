import { createStore } from 'easy-peasy';

import User from './model/User';

export const store = createStore({
  user: User,
});

// remember the current value of state variable, not to directly access store.getState
function handleChange() {}
store.subscribe(handleChange);
