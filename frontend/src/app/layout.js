import { Manrope, Inter } from 'next/font/google'
import './globals.css'

// 1. Next.js Optimized Fonts Setup
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Kinetic Precision',
  description: 'Professional Fleet & Asset Management',
}

export default function RootLayout({ children }) {
  return (
    // 2. CSS variables ko HTML tag mein inject kiya
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        {/* 3. Material Symbols Icon Font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      {/* 4. Default font ko 'sans' set kiya jo hum Tailwind mein define karenge */}
      <body className="font-sans antialiased text-slate-900 bg-slate-50">
        {children}
      </body>
    </html>
  )
}