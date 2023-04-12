
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Layout from '../layouts/Layout';
import BlogList from '../pages/BlogList';
import Home from '../pages/Home';
import RequireAuth from '../components/RequireAuth';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/login',
//         element: <Login />
//       },
//       {
//         path: '/register',
//         element: <Register />
//       },
//       {
//         path: '/blogs',
//         element: <BlogList />
//       }

//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route to='/' element={<RequireAuth />}>
          <Route path='blogs' element={<BlogList />} />
        </Route>
      </Route>
    </Route>
  )
)

export default router
