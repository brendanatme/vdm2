import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <h1>VDM</h1>
      
      <nav className="main-nav">
        <Link to="/">Pads</Link> |{' '}
        <Link to="/sequencer">Sequencer</Link> |{' '}
        <Link to="/settings">Settings</Link>
      </nav>

      <main>
        {children}
      </main>
    </div>
  )
}
