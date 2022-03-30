import { useState } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { TodoItem } from '../types/types';

export function useTodoItem(item: TodoItem) {
  // state to keep track if the todo items needs to updated or not. If its in edit mode, then input text is displayed instead of text.
  const [edit, setEdit] = useState(false);
  // state to keep track of text inputed in text input.
  const [text, setText] = useState(item.title);
  const dispatch = useDispatch();

  function handlePress() {
    if (edit && text.length > 0) {
      Keyboard.dismiss();
      dispatch({ type: 'UPDATE_TITLE', id: item.id, title: text });
      setEdit(false);
    } else {
      dispatch({ type: 'DELETE_ITEM', id: item.id });
    }
  }

  function handleCheckboxSelect(val: boolean) {
    dispatch({ type: 'UPDATE_ISCOMPLETED', id: item.id, isCompleted: val });
  }

  return { edit, setEdit, text, setText, handlePress, handleCheckboxSelect };
}
