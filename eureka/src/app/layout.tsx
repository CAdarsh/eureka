import type { Metadata } from "next";
import "./globals.css";
import { clsx } from 'clsx';
import Image from 'next/image'
import font from "../utils/font";


export const metadata: Metadata = {
  title: "Eureka",
  description: "Never forget an idea again!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(font.L_Franklin, 'body', font.PlaywriteUSModern)}>
        <header className={clsx('flex-row', 'header')}>
          <div className={font.PlaywriteUSModern}>
            Eureka
          </div>
          <Image
            className={clsx("profile")}
            src="/avatar.svg"
            width={50}
            height={50}
            alt="Avatar"
            />
        </header>
        {children}</body>
    </html>
  );
}
