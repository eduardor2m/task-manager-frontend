import { TaskProvider } from '@/hooks/useTask'
import { UserProvider } from '@/hooks/useUser'
import '@/styles/globals.scss'

import { Inter } from 'next/font/google'

import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <TaskProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/rocket.svg" />
          </head>
          <body className={inter.className}>{children}</body>
        </html>
      </TaskProvider>
    </UserProvider>
  )
}
