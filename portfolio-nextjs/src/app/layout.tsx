import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const metadata = {
  title: 'My Portfolio',
  description: 'Showcasing my work and experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}