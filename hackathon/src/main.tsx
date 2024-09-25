import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx';
import ExploreChallenge from './pages/ExploreChallenge.tsx';
import CreateChallenge from './pages/CreateChallenge.tsx';
import Participation from './pages/Participation.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'/challenge',
        element:<ExploreChallenge/>
      },
      {
        path:'/create',
        element:<CreateChallenge/>
      },
      {
        path:'/participate',
        element:<Participation/>
      }
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
