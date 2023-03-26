import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BreedCard, { breedImageLoader } from './components/BreedCard';
import BreedListing from './components/BreedListing';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BreedListing />,
  },
  {
    path: "/breed/:breedName",
    element: <BreedCard />,
    loader: breedImageLoader
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="flex justify-center text-center w-full">
      <div className="w-11/12 md:w-4/5 lg:w-3/5">
        <header className="mt-5 mb-5">
          <h1 className="text-2xl tracking-widest"><a href="/">DOGGOS</a></h1>
        </header>
        <RouterProvider router={router} />
      </div>
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
