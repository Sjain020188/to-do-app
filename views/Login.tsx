import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useBiometrics } from '../hooks/useBiometrics';


/* --------------------------------------------------------------------------*/
/*                              Component                                    */
/* --------------------------------------------------------------------------*/

/**
 * Login screen which allows users to authenticate using biometrics.
 * expo Local authetication is used for authetication purpose.
 * if the user has registered faceId, iris or touchId on phone then it will ask user to autheticate using those
 * else it will fall back to passcode. if none of them is set up then user cannot autheticate. 
 * Ideally if none of them is setup user should be able to login via username password.
 *
 */
export function Login() {
  const {isLoading, isBiometricSupported, error, handleBiometricAuth} = useBiometrics()

  return (
    <S.View>
      {isLoading ? (
        <ActivityIndicator />
      ) : isBiometricSupported ? (
        <S.TouchableOpacity onPress={handleBiometricAuth}>
          <S.Text.Button>Login with Biometrics</S.Text.Button>
        </S.TouchableOpacity>
      ) : (
        <S.Text.Button>Biometrics is not supported by this device</S.Text.Button>
      )}
      {error && (
        <S.Text.Error>
          There is an error with biometrics authentication. Make sure you have pincode or biometrics
          set up.
        </S.Text.Error>
      )}
    </S.View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  View: styled.View`
    flex: 1;
    padding: 40px 20px 0px 20px;
    background-color: #9254c8;
    justify-content: center;
    align-items: center;
  `,
  TouchableOpacity: styled.TouchableOpacity`
    height: 60px;
  `,
  Text: {
    Button: styled.Text`
      font-size: 20px;
      font-weight: 400;
      color: #fff;
    `,
    Error: styled.Text`
      font-size: 20px;
      font-weight: 400;
      color: #404040;
    `
  }
};
