"use client";
import '../globals.css';
import { AppWrapper } from '../context/';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppWrapper>
                    {children}
                </AppWrapper>
            </body>
        </html>
    )
}