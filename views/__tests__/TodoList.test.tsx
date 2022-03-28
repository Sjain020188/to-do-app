/**
 * @format
 */

import 'react-native';
import React from 'react';
import { TodoList } from '../../views/TodoList';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('todo list', () => {
  let screen: RenderAPI;
  let store: MockStoreEnhanced<unknown, unknown>;
  beforeEach(() => {
    store = mockStore({
      isAutheticated: true,
      todoItems: [{ id: 'testId', title: 'test', isCompleted: false }]
    });
    store.dispatch = jest.fn();
    screen = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  });

  it('displays todo item title', () => {
    const todo = screen.queryAllByText('test');
    expect(todo).toHaveLength(1);
  });

  it('allows you to update item title', async () => {
    const title = screen.queryByText('test');
    await act(async () => {
      if (title) {
        await fireEvent.press(title);
        const textInput = screen.queryByDisplayValue('test');
        if (textInput) {
          await fireEvent.changeText(textInput, 'updatedTest');
        }
        const updateBtn = screen.queryByText('Update');
        if (updateBtn) {
          await fireEvent.press(updateBtn);
        }
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TITLE',
      id: 'testId',
      title: 'updatedTest'
    });
  });

  it('has delete button with dispatches delete item action to delete that particular todoItem', () => {
    const deleteBtn = screen.queryByText('Delete');
    act(() => {
      if (deleteBtn) {
        fireEvent.press(deleteBtn);
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'DELETE_ITEM', id: 'testId' });
  });

  it('has add button with dispatches add item action to add that particular todoItem', async () => {
    const input = screen.queryByDisplayValue('');
    const addBtn = screen.queryByText('Add');
    await act(async () => {
      if (input) {
        await fireEvent.changeText(input, 'new todo');
      }
      if (addBtn) {
        await fireEvent.press(addBtn);
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      title: 'new todo'
    });
  });
});
