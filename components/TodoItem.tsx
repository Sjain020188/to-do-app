import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { TodoItem as TodoItemType } from '../types/types';

/* --------------------------------------------------------------------------*/
/*                              Types                                        */
/* --------------------------------------------------------------------------*/

type Props = { item: TodoItemType };

/* --------------------------------------------------------------------------*/
/*                              Component                                    */
/* --------------------------------------------------------------------------*/

/**
 * Displays each item in todo list.
 *
 */

export function TodoItem({ item }: Props) {
  // state to keep track if the todo items needs to updated or not. If its in edit mode, then input text is displayed instead of text.
  const [edit, setEdit] = useState(false);
  // state to keep track of text inputed in text input.
  const [text, setText] = useState(item.title);
  const dispatch = useDispatch();

  function handlePress() {
    if (edit && text.length > 0) {
      dispatch({ type: 'UPDATE_TITLE', id: item.id, title: text });
      setEdit(false);
      Keyboard.dismiss();
    } else {
      dispatch({ type: 'DELETE_ITEM', id: item.id });
    }
  }

  function handleCheckboxSelect(val: boolean) {
    dispatch({ type: 'UPDATE_ISCOMPLETED', id: item.id, isCompleted: val });
  }

  return (
    <S.View.Container key={item.id} isCompleted={item.isCompleted}>
      {edit ? (
        <S.TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={handlePress}
          returnKeyType={'done'}
          autoFocus
        />
      ) : (
        <S.View.Row>
          <CheckBox
            value={item.isCompleted}
            onValueChange={handleCheckboxSelect}
            boxType={'square'}
            tintColors={{ true: '#e52581', false: '#000' }}
            onAnimationType={'bounce'}
            offAnimationType={'bounce'}
            onTintColor={'#e52581'}
            onFillColor={'#e52581'}
            onCheckColor={'#fff'}
          />
          <S.TouchableOpacity onPress={() => setEdit(true)}>
            <S.Text.Title isCompleted={item.isCompleted}>{item.title}</S.Text.Title>
          </S.TouchableOpacity>
        </S.View.Row>
      )}
      <TouchableOpacity onPress={handlePress}>
        <S.Text.Button>{edit ? 'Update' : 'Delete'}</S.Text.Button>
      </TouchableOpacity>
    </S.View.Container>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

export const S = {
  View: {
    Container: styled.View<{ isCompleted: boolean }>`
      padding: 10px;
      margin: 0px 10px;
      border-bottom-width: 1px;
      border-bottom-color: #a9a9a9;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: ${({ isCompleted }) => (isCompleted ? '#E8E8E8' : '#fff')};
    `,
    Row: styled.View`
      flex: 1;
      flex-direction: row;
    `
  },
  Text: {
    Title: styled.Text<{ isCompleted: boolean }>`
      font-size: 20px;
      flex-shrink: 1;
      color: #404040;
      text-decoration-line: ${({ isCompleted }) => (isCompleted ? 'line-through' : 'none')};
      padding-left: 10px;
    `,
    Button: styled.Text`
      font-size: 20px;
      color: #e52581;
    `
  },
  TextInput: styled.TextInput`
    border-bottom-width: 1px;
    width: 200px;
    font-size: 20px;
  `,
  TouchableOpacity: styled.TouchableOpacity`
    flex: 1;
  `
};
