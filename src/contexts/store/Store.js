import { createStore } from 'easy-peasy';

import AppState from './model/AppState';
import DataNeedUpdate from './model/DataNeedUpdate';
import User from './model/User';

export const store = createStore({
  user: User,
  appState: AppState,
  dataNeedUpdate: DataNeedUpdate,
});

// remember the current value of state variable, not to directly access store.getState
export let currentAccessToken;
export let currentSessionID;
export let setLogin;
export let setLogout;
export let initDataNeedUpdate;
function handleChange() {
  currentAccessToken = store.getState().appState.accessToken;
  currentSessionID = store.getState().appState.sessionID;
  setLogin = store.dispatch.user.setLogin;
  setLogout = store.dispatch.user.setLogout;
  initDataNeedUpdate = store.dispatch.dataNeedUpdate.initDataNeedUpdate;
}
store.subscribe(handleChange);
