import './globals.css'
import { Providers } from './Providers'

export const metadata = {
  title: 'Arc Swap - ItzAbhi',
  description: 'Web3 Testnet Swap App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}