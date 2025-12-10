"use client";

import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
    return (
        <div className={`min-h-screen flex ${className}`}>
            {/* Left Sidebar - decorative */}
            <div className="hidden lg:block lg:w-[15%] xl:w-[18%] 2xl:w-[20%] bg-muted/30 flex-shrink-0" />

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-background">
                {children}
            </main>

            {/* Right Sidebar - decorative */}
            <div className="hidden lg:block lg:w-[15%] xl:w-[18%] 2xl:w-[20%] bg-muted/30 flex-shrink-0" />
        </div>
    );
}
