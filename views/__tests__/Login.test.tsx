/**
 * @format
 */

import 'react-native';
import React from 'react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { render, fireEvent, RenderAPI, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Login } from '../Login';

const mockStore = configureStore([]);

// NOTE: Mocking expo-local-authetication to return true for hasHardwareAsync and authenticate Async
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: () => true,
  authenticateAsync: () => ({ success: true })
}));

describe('login screen', () => {
  let screen: RenderAPI;
  let store: MockStoreEnhanced<unknown, unknown>;
  beforeEach(async () => {
    store = mockStore({
      isAutheticated: true,
      todoItems: [{ id: 'testId', title: 'test', isCompleted: false }]
    });
    store.dispatch = jest.fn();
    screen = await waitFor(() => {
      return render(
        <Provider store={store}>
          <Login />
        </Provider>
      );
    });
  });

  it('displays todo item title', async () => {
    const loginText = await screen.queryAllByText('Login with Biometrics');
    expect(loginText).toHaveLength(1);
  });

  it('it autheticates user if the user passes biometrics', async () => {
    await act(async () => {
      const loginText = await screen.queryAllByRole('button');
      if (loginText[0]) {
        fireEvent.press(loginText[0]);
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'AUTHENTICATE' });
  });
});
