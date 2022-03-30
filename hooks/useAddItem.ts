import { useState } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

export function useAddItem() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function submit() {
    if (text.length > 0) {
      dispatch({ type: 'ADD_ITEM', title: text });
    }
    setText('');
    Keyboard.dismiss();
  }

  return { submit, text, setText };
}
