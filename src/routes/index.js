import Error from 'Pages/Error';
import Home from 'Pages/Home';
import Todos from 'Pages/Todos';

export default [
  { path: '/', exact: true, component: Home },
  { path: '/todos', exact: true, component: Todos },
  { path: '*', component: Error }
];
