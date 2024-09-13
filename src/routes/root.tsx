import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from '~/Layout'

export function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
