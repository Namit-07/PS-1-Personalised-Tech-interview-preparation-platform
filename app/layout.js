import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/AuthContext";
import { ThemeProvider } from "./lib/ThemeContext";
import { ActivityProvider } from "./lib/ActivityContext";
import AppLayout from "./components/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillForge.AI",
  description: "Prepare for coding interviews with AI-driven personalized practice and real-time feedback.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ActivityProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </ActivityProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
