import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as Routes from '~/routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Routes.Root />,
    errorElement: <Routes.ErrorPage />,
    children: [
      {
        index: true,
        element: <Routes.Pads />,
      },
      {
        path: 'sequencer',
        element: <Routes.Sequencer />,
      },
      {
        path: 'settings',
        element: <Routes.Settings />,
      },
    ],
  },
])

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
