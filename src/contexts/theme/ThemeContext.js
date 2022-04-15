import React, {useState} from 'react';

// import { THEME_NAME } from '~src/constants/Constant';
import {AppDefaultTheme} from '~src/contexts/theme/AppTheme';

// import { StorageService } from '~src/services';

const ThemeContext = React.createContext();

export const ThemeContextProvider = ({theme, children}) => {
  const [themeObj, changeTheme] = useState(theme || AppDefaultTheme);

  const setTheme = t => {
    const themeObjCaptured = AppDefaultTheme;
    changeTheme(themeObjCaptured);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeObj,
        setTheme: t => setTheme(t),
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
