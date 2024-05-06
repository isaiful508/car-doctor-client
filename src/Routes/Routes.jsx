import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Sign Up/SignUp";

import BookService from "../Pages/BookService/BookService";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signUp',
          element:<SignUp></SignUp>
        },
        {
          path:'book/:id',
          element: <PrivateRoutes><BookService></BookService></PrivateRoutes>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
         path:'/bookings',
         element:<PrivateRoutes><Bookings></Bookings></PrivateRoutes>
        },

      ]
    }
  ])

  export default router;