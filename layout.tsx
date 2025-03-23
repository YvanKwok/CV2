import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <head>
        <title>郭俊泽 - 个人简历</title>
        <meta name="description" content="郭俊泽的个人简历网站 - 商业化新媒体运营专家" />
      </head>
      <body className={cn("min-h-screen bg-black font-sans antialiased", inter.className)}>{children}</body>
    </html>
  )
}

