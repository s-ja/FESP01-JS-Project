import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Error404 from './pages/error/Error404';
import TodoInfo from './pages/info/TodoInfo';
import TodoList from './pages/list/TodoList';
import TodoRegist from './pages/regist/TodoRegist';
import TodoUpdate from './pages/update/TodoUpdate';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TodoList />,
      },
      {
        path: '/info',
        element: <TodoInfo />,
      },
      {
        path: '/regist',
        element: <TodoRegist />,
      },
      {
        path: '/update/:_id',
        element: <TodoUpdate />,
      },
    ],
    errorElement: <Error404 />,
  },
]);

export default router;
