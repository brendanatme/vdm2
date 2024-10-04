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
      {
        path: 'settings',
        element: <Routes.SettingsScreen />,
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
    '• server (deep-linking support)',
    '• add kits',
    '• compress kit sounds',
    '• export sequence to audio?',
    '• export sequence to midi?',
  ]
  todos.forEach((todo) => console.log(todo))
}

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
