import { createStore } from 'redux';
import { TodoItem } from '../types/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

/* --------------------------------------------------------------------------*/
/*                              Types                                        */
/* --------------------------------------------------------------------------*/

type Action =
  | {
      type: 'AUTHENTICATE';
    }
  | { type: 'ADD_ITEM'; title: string }
  | { type: 'DELETE_ITEM'; id: string }
  | {
      type: 'UPDATE_TITLE';
      id: string;
      title: string;
    }
  | {
      type: 'UPDATE_ISCOMPLETED';
      id: string;
      isCompleted: boolean;
    };

export type BaseState = {
  isAuthenticated: boolean;
  todoItems: TodoItem[];
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todoItems']
};

/* --------------------------------------------------------------------------*/
/*                        Initial state and reducer                           */
/* --------------------------------------------------------------------------*/

const initialState: BaseState = {
  isAuthenticated: false,
  todoItems: []
};

export const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'AUTHENTICATE': {
      return { ...state, isAuthenticated: true };
    }

    case 'ADD_ITEM': {
      const newState = {
        ...state,
        todoItems: [...state.todoItems, { id: uuidv4(), title: action.title, isCompleted: false }]
      };
      return newState;
    }

    case 'UPDATE_TITLE': {
      const newTodoItems = [...state.todoItems];
      const index = newTodoItems.findIndex(({ id }) => id === action.id);
      if (index !== -1) {
        newTodoItems[index].title = action.title;
      }
      return { ...state, todoItems: newTodoItems };
    }

    case 'UPDATE_ISCOMPLETED': {
      const newTodoItems = [...state.todoItems];
      const index = newTodoItems.findIndex(({ id }) => id === action.id);
      if (index !== -1) {
        newTodoItems[index].isCompleted = action.isCompleted;
      }
      return { ...state, todoItems: newTodoItems };
    }

    case 'DELETE_ITEM': {
      const newItems = state.todoItems.filter(({ id }) => action.id != id);
      return { ...state, todoItems: newItems };
    }
    default:
      return state;
  }
};

const rootReducer = persistReducer(persistConfig, appReducer);

const store = createStore(rootReducer);
export const persistor = persistStore(store);

export default store;
