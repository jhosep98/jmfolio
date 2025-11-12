import type * as React from 'react'
import ThemeProvider from './theme-provider'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
    {children}
  </ThemeProvider>
)

export default AppProvider
