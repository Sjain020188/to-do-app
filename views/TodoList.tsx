import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { BaseState } from '../redux/store';
import { TodoItem as TodoItemType } from '../types/types';
import { EmptyContainer } from '../components/EmptyContainer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TodoItem } from '../components/TodoItem';

/* --------------------------------------------------------------------------*/
/*                              Component                                    */
/* --------------------------------------------------------------------------*/

/**
 * Displays todo list with options to add, delete, update or mark completed the items.
 *
 */
export function TodoList() {
  const items = useSelector((state: BaseState) => state.todoItems);

  return (
    <S.SafeAreaView>
      <S.KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <S.View>
          <Header />
          <S.FlatList
            data={items}
            renderItem={({ item }: { item: TodoItemType }) => <TodoItem item={item} />}
            ListEmptyComponent={<EmptyContainer />}
          />
        </S.View>
        <Footer />
      </S.KeyboardAvoidingView>
    </S.SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  FlatList: styled(FlatList as any)`
    flex-grow: 1;
  `,
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
  `,
  View: styled.View`
    flex: 0.9;
  `,
  KeyboardAvoidingView: styled.KeyboardAvoidingView`
    flex: 1;
  `
};
