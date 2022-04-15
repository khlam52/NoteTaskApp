import React, {useState} from 'react';

import {StatusBar} from 'react-native';

import Loader from '../../components/Loader';

const AppContext = React.createContext();

export const AppContextProvider = ({children}) => {
  const [isFinishLaunching, setIsFinishLaunching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        showLoading,
        hideLoading,
        isFinishLaunching,
        setIsFinishLaunching,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {children}
      <Loader isLoaderShow={isLoading} />
    </AppContext.Provider>
  );
};

export default AppContext;
