import React from 'react'
import { NavLink } from 'react-router-dom'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

const navLinkClassNameFn: (arg: { isActive: boolean }) => string = ({ isActive }) =>
  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`

export function Layout({ children }: LayoutProps) {
  
  return (
    <div id="layout" className={styles.layout}>
      <div className={_(uStyles.fill, styles.bg)} />
      <div className={styles.header}>
        <h1 className={styles.heading}>
          <img className={styles.logo} height={24} src="/assets/vdm.svg" alt="VDM" width={72} />
        </h1>
        
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
