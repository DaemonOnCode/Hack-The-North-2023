import './globals.css';
import { UserProvider } from '../app/context/userContext';

export const metadata = {
  title: 'OneHireHub',
  description: 'Created by methOD',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  )
}
