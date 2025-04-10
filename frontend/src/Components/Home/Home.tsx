import { useCallback, useEffect, useState } from 'react';
import api from '../../Api/api';
interface User {
  email: string;
}
const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const getUserData = useCallback(() => {
    api
      .get('/me')
      .then((response) => {
        setUser(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        setUser(null);
        console.log('User not found', error);
      });
  }, []);
  useEffect(() => {
    const unsubscribe = () => getUserData();
    return () => unsubscribe();
  }, [getUserData]);
  return <p>hello {user?.email}</p>;
};

export default Home;
