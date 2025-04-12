import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import SigninLAyout from './Components/SigninLayout';
import Layout from './Components/Layouts';
import Agenda from './Components/Agenda';
import Signup from './Components/Signup';
// import Agenda from './Components/Agenda';
const router = createHashRouter([
  {
    path: '/',
    element: <SigninLAyout />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/Agenda',
        element: <Agenda />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
