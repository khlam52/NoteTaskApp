import React from 'react';

import {StoreProvider} from 'easy-peasy';

import {AppContextProvider} from './src/contexts/app/AppContext';
import {LocalizationContextProvider} from './src/contexts/i18n/LocalizationContext';
import {store} from './src/contexts/store/Store';
import {ThemeContextProvider} from './src/contexts/theme/ThemeContext';
import RootStack from './src/navigations/RootStack';

const App = () => {
  return (
    <LocalizationContextProvider>
      <ThemeContextProvider>
        <StoreProvider store={store}>
          <AppContextProvider>
            <RootStack />
          </AppContextProvider>
        </StoreProvider>
      </ThemeContextProvider>
    </LocalizationContextProvider>
  );
};

export default App;
