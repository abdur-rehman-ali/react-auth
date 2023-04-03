
import { createBrowserRouter } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }

    ]
  }
])

export default router
