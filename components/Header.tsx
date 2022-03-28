import React from 'react';
import styled from 'styled-components/native';

/* --------------------------------------------------------------------------*/
/*                              Component                                    */
/* --------------------------------------------------------------------------*/

/**
 * Header displayed on top.
 *
 */
export function Header() {
  return (
    <S.View>
      <S.Text>TO DO LIST</S.Text>
    </S.View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  View: styled.View`
    border-bottom-width: 1px;
    padding-bottom: 20px;
  `,
  Text: styled.Text`
    font-size: 20px;
    font-weight: 600;
    align-self: center;
  `
};
