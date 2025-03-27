import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleAuthResponse } from 'src/services/link-account/types/linkAccount';
import { handleTokenError } from 'src/services/link-account/error/handleTokenError ';
const useToken = (setEmail: (email: string) => void) => {
  useEffect(() => {
    const getTokenFromUrl = (): string | null => {
      const params = new URLSearchParams(window.location.search);
      return params.get('token');
    };
    const handleToken = (token: string) => {
      try {
        const decoded = jwtDecode<GoogleAuthResponse>(token);
        setEmail(decoded.email);
      } catch (error: unknown) {
        handleTokenError(error);
      }
    };
    const token = getTokenFromUrl();
    if (token) {
      handleToken(token);
    }
  }, [setEmail]);
};

export default useToken;
