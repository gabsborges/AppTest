import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ForgotAccount from './pages/ForgotAccount';
import Dashboard from './pages/Dashboard';
import NonPage from './pages/NonPage';

import Private from './routes/Private';
import Tasks from './pages/Tasks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/create-account',
    element: <CreateAccount />
  },
  {
    path: '/forgot-your-account',
    element: <ForgotAccount />
  },
  {
    path: '/dashboard',
    element: <Private><Dashboard /></Private>
  },
  {
    path: '/tasks',
    element: <Private><Tasks /></Private>
  },
  {
    path: '*',
    element: <NonPage />
  },
])

export { router }