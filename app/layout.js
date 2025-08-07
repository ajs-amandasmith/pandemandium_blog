// "use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import React, { useEffect, useState } from 'react';
import { Layout } from './components'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pandemandium",
  description: "Blog for the use Pandemandium",
};

export default function RootLayout({ children, Component, pageProps }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
          {/* <Component {...pageProps} /> */}
        </Layout>
        {children}
      </body>
    </html>
  );
}
