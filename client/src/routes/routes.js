import Login from '../pages/Login';
import App from '../App';
import Home from '../pages/Home';
import Register from '../pages/Register'
import { createBrowserRouter} from 'react-router-dom';
import AuthUser from '../utils/AuthUser';
import Guest from '../utils/Guest';


export default createBrowserRouter([
    {
      element: <App/>,
      children:[
        {
          path:"/",
          element:<AuthUser><Home/></AuthUser>
        },
        {
          path:"/login",
          element:<Guest><Login/></Guest>,
        },
        {
          path:"/register",
          element:<Guest><Register/></Guest>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ]);