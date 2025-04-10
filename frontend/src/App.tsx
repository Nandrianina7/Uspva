import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import SigninLAyout from './Components/SigninLayout';
import Layout from './Components/Layouts';
// import Agenda from './Components/Agenda';
const router = createHashRouter([
  {
    path: '/',
    element: <SigninLAyout />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
