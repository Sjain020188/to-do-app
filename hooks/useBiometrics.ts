import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';

export function useBiometrics() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  // check if device supports biometrics authetication.
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      setIsLoading(false);
    })();
  }, []);

  // autheticate the user.
  async function handleBiometricAuth() {
    setIsLoading(true);
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Enter Passcode'
    });
    setIsLoading(false);
    // Log the user in on success
    if (biometricAuth.success) {
      dispatch({ type: 'AUTHENTICATE' });
    } else {
      setError(true);
    }
  }

  return { isBiometricSupported, isLoading, error, handleBiometricAuth };
}
