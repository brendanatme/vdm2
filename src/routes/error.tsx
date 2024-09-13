import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Layout } from '~/Layout'

export function ErrorPage() {
  const error = useRouteError()
  return (
    <Layout>
      <h2>Error</h2>
      <p>An unexpected error occurred.</p>
      {/* @ts-expect-error */}
      <p>{error.statusText || error.message}</p>
    </Layout>
  )
}
