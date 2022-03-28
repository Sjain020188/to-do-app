import React from 'react';
import styled from 'styled-components/native';

/* --------------------------------------------------------------------------*/
/*                              Component                                    */
/* --------------------------------------------------------------------------*/

/**
 * Component to be displayed when there are no to do items.
 *
 */
export function EmptyContainer() {
  return (
    <S.View>
      <S.Text>No Items in to do list</S.Text>
    </S.View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  View: styled.View`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.Text`
    font-size: 20px;
  `
};
