
import { createBrowserRouter } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Layout from '../layouts/Layout';
import BlogList from '../pages/BlogList';
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
      },
      {
        path: '/blogs',
        element: <BlogList />
      }

    ]
  }
])

export default router
