import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import type * as React from 'react'
import { Toaster } from '@/components/ui/sonner'
import { CounterStoreProvider } from './counter-store-provider'
import ThemeProvider from './theme-provider'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
    <CounterStoreProvider>
      {children}
      <Toaster
        richColors
        position='top-right'
        icons={{
          success: <CircleCheckIcon className='size-4' />,
          info: <InfoIcon className='size-4' />,
          warning: <TriangleAlertIcon className='size-4' />,
          error: <OctagonXIcon className='size-4' />,
          loading: <Loader2Icon className='size-4 animate-spin' />,
        }}
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
            '--border-radius': 'var(--radius)',
          } as React.CSSProperties
        }
      />
    </CounterStoreProvider>
  </ThemeProvider>
)

export default AppProvider
