import React, { FC } from 'react'

import Navigation from '#navigation/Navigation'
import ContextProvider from '#context/ContextProvider'

const App: FC = () => {
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  )
}

export default App
