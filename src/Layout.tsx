import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

const navLinkClassNameFn: (arg: { isActive: boolean }) => string = ({ isActive }) =>
  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`

export function Layout({ children }: LayoutProps) {
  
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h1 className={styles.logo}>VDM2</h1>
        
        <nav role="navigation" className={styles.nav}>
          <NavLink className={navLinkClassNameFn} to="/">Pads</NavLink>
          <NavLink className={navLinkClassNameFn} to="/sequencer">Sequencer</NavLink>
        </nav>
      </div>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
