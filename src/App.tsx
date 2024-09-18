import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as Routes from '~/routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Routes.RootLayout />,
    errorElement: <Routes.ErrorScreen />,
    children: [
      {
        index: true,
        element: <Routes.PadsScreen />,
      },
      {
        path: 'sequencer',
        element: <Routes.SequencerScreen />,
      },
    ],
  },
])

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
