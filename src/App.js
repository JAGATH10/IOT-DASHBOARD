import React from 'react';
import './App.css';

import { createBrowserRouter, createRoutesFromElements,  RouterProvider, Route} from "react-router-dom";
import LoginPage from './login-page/login';
import RegisterPage from './login-page/register';
import Dashboard from './dashboard/webpage/Dashboard';

const route = createBrowserRouter(
  createRoutesFromElements(
     <Route path="/" >
       <Route index element={<LoginPage/>}/>
       <Route path="Registerpage" element={<RegisterPage/>} />
       <Route path="Dashboard" element={<Dashboard/>} />
     </Route>
  )
)

function App() {
  return (
    <div >
       <RouterProvider router={route}/> 
    </div>
  );
}

export default App;
