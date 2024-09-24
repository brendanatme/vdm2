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

if (process.env.NODE_ENV !== 'production') {
  console.log("%cWelcome!", [
    'color: #69c',
    'font-weight: 700',
    'font-size: 24px',
  ].join(';'))
  console.log("%cTodos:", [
    'color: #69c',
    'font-weight: 400',
    'font-size: 16px',
  ].join(';'))
  const todos = [
    '• Link/font styles',
    '• Sequencer: 2nd bar',
    '• Sequencer: save/load sequence',
    '• HYPE_MODE option',
    '• server (deep-linking support)',
    '• use pointer events',
  ]
  todos.forEach((todo) => console.log(todo))
}

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
