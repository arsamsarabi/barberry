import React, { ReactElement, FC } from 'react'

import AuthContext from './AuthContext'

interface ContextProviderInterface {
  children: ReactElement
}

const ContextProvider: FC<ContextProviderInterface> = ({ children }) => {
  return <AuthContext>{children}</AuthContext>
}

export default ContextProvider
