import type * as React from 'react'
import { CounterStoreProvider } from './counter-store-provider'
import ThemeProvider from './theme-provider'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
    <CounterStoreProvider>{children}</CounterStoreProvider>
  </ThemeProvider>
)

export default AppProvider
