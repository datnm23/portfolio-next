"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <ThemeProvider defaultTheme="light" switchable>
                    <TooltipProvider>
                        {children}
                        <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
            </LanguageProvider>
        </QueryClientProvider>
    );
}
