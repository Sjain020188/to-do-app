import React, { useState } from 'react';
import { Platform, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { useAddItem } from '../hooks/useAddItem';

/* --------------------------------------------------------------------------*/
/*                              Component                                    */
/* --------------------------------------------------------------------------*/

/**
 * Component displayed at the bottom which allows user to add todo item.
 *
 */
export function Footer() {
  const { submit, text, setText } = useAddItem()

  return (
    <S.KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <S.View>
        <S.TextInput
          onChangeText={setText}
          value={text}
          onSubmitEditing={submit}
          returnKeyType={'done'}
        />
        <S.TouchableOpacity onPress={submit}>
          <S.Text>Add</S.Text>
        </S.TouchableOpacity>
      </S.View>
    </S.KeyboardAvoidingView>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  TextInput: styled.TextInput`
    border: 1px;
    border-radius: 5px;
    flex: 1;
    margin: 0px 10px 0px 0px;
    padding: 5px;
    font-size: 20px;
  `,
  View: styled.View`
    position: absolute;
    bottom: 0px;
    flex-direction: row;
    padding: 10px 10px 20px;
    border-top-width: 1px;
    elevation: 5;
    shadow-color: #BEBEBE;
    shadow-offset: {width: 0, height: -5};
    shadow-opacity: 0.8;
    shadow-radius: 2px;
    z-index: 999;
    background-color: #fff;
  `,

  TouchableOpacity: styled.TouchableOpacity`
    background-color: #e52581;
    color: #fff;
    padding: 0px 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
  `,
  KeyboardAvoidingView: styled.KeyboardAvoidingView`
    flex: 0.1;
  `,
  Text: styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: 400;
  `
};
