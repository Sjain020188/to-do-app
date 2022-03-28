# Todo App

## Introduction

This project is created as a part of Coding Challenge for Paidy.
Its a MVP CRUD todo app written in React Native. Biometrics login is required in order to access the app. Within the app you can add todo item, update it, mark it completed or delete it.

## Functionality

- After you launch the app you will see a button to autheticate yourself (if your mobile supports biometrics authetication).
- After you click on that and autheticate youeself you will be navigated to to do list.
- Add item by adding title in text box at the bottom and press add button.
- Mark item completed by clicking on checkox next to item
- Update item by clicking on title. It will change to input box. Update text and then press update.
- Delete item by clicking delete button corresponding to item.

## Technical Decisions

- `expo-local-authentication` is used for biometrics authentication. If user fails to verify using biometrics it defaults to mobile phone passcode.
- redux is used for state management.
- to do items are persisted in async storage so that they are retained even when user removes app from memory.
- authentication status in not persisted in async storage because we want user to verify the identity each time they load the app (open the app after removing from memory. Similar to paidy app).
- no navigation library is added. it simply loads the screen based on `isAutheticated` status (due to time constraints)
- tests are written using `react-native-testing-library`. `expo-local-authetication` is mocked with the functions returning true values. I have written test for only two top views but its checks all the crud operation in todo list.
- Decided to keep the ui very simple with very few external libraries (only required ones are added).

## Stack used

- React
- Redux (for state management)
- Redux-persist (for persisting todo items in todo list)
- Styled-Components (for styling)
- expo-local-authentication (for authetication)
- React-Native-testing-library (for writing tests)

## Setup and run the project locally

- Make sure you are using node version 16.14.2

- Install all dependencies

`yarn`

- Go to ios folder and install pods

`cd ios`
`pod install`

- Start the server

`yarn start`

- To run ios simulator

`yarn ios`

- To run android simulator

`yarn android`

## Other Available Scripts

### `yarn lint:fix`

This command will fix the linitng errors.

### `yarn format`

This command will format your files using prettier configuration.

### `yarn test`

To run unit tests.

## What would I do if I have more time.

- Add more styling
- Improve test coverage
- Fix issue mentioned below

## Issues is current codebase

- When you update item, need to click update button twice. First time it just dismiss keyboard. Second time it actually updates.
- Currently if the user mobile does not have biometrics or login passcode setup, there is no way he can autheticate.
  Ideally if user cannot autheticate using biometrics or pincode he should be able to enter username or password.
