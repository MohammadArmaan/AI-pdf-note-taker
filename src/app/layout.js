import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata = {
    title: "AI PDF Note Taker",
    description: "AI PDF Note Taker is an intelligent application designed to help users take notes on PDFs using AI-powered capabilities. It leverages modern web technologies and AI frameworks to provide an enhanced note-taking experience.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className}`}>
              <ClerkProvider>
                <Provider>
                    {children}
                    </Provider>
                    <Toaster />
              </ClerkProvider>
            </body>
        </html>
    );
}
