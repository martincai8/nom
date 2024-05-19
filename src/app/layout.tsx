import type { Metadata } from 'next';
import './globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AuthProvider } from '@/utility/Auth';

export const metadata: Metadata = {
	title: 'nom nom nom',
	description: 'nom',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no viewport-fit=cover'
				/>
				<meta name='apple-mobile-web-app-capable' content='yes'></meta>
				<meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'></meta>
			</head>
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
