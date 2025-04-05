import { useEffect, useState } from 'react';

const useValidEmail = (email: string): boolean => {
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const regExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(regExp.test(String(email).toLocaleLowerCase()));
  }, [email]);
  return isValid;
};
export default useValidEmail;
