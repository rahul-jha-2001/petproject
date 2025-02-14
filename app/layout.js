


import "./globals.css"
import { Inter } from "next/font/google"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Romantic Rose Bouquet",
  description: "A special interactive bouquet just for you",
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          />
        ))}
      </body>
    </html>
  )
}

