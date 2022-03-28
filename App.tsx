import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

import { Login } from './views/Login';
import { TodoList } from './views/TodoList';
import { BaseState } from './redux/store';

/* -------------------------------------------------------------------------- 
/*                              Component                                     
/* -------------------------------------------------------------------------- 

/**
 * Top level component which displays either login screen if user is not autheticated and todoList if user is authenticated.
 *
 */

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isAuthenticated = useSelector((state: BaseState) => state.isAuthenticated);

  return (
    <React.Fragment>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!isAuthenticated ? <Login /> : <TodoList />}
    </React.Fragment>
  );
};

export default App;
