import { AuthProvider } from '@/context/AuthContext'
import { Geist, Geist_Mono } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata = {
	title: 'Aura Booking - Premium Booking Platform',
	description: 'Elevate your beauty bookings with Aura.',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NextTopLoader
					color='#18181b'
					height={3}
					showSpinner={false}
					speed={300}
				/>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	)
}
