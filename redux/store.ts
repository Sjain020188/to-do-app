import { createStore } from 'redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { TodoItem } from '../types/types';

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
/*                        Utility function                                   */
/* --------------------------------------------------------------------------*/

function getUpdatedTodoItems(itemId: string, items: TodoItem[], data: Partial<TodoItem>) {
  return [...items].map((item) => {
    if (item.id === itemId) {
      return { ...item, ...data };
    }
    return item;
  });
}

/* --------------------------------------------------------------------------*/
/*                        Initial state and reducer                          */
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
      return {
        ...state,
        todoItems: [...state.todoItems, { id: uuidv4(), title: action.title, isCompleted: false }]
      };
    }

    case 'UPDATE_TITLE': {
      return {
        ...state,
        todoItems: getUpdatedTodoItems(action.id, state.todoItems, { title: action.title })
      };
    }

    case 'UPDATE_ISCOMPLETED': {
      return {
        ...state,
        todoItems: getUpdatedTodoItems(action.id, state.todoItems, {
          isCompleted: action.isCompleted
        })
      };
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
