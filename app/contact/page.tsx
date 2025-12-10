"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Loader2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OWNER_NAME, OWNER_NAME_EN, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, OWNER_LOCATION_EN, FORMSPREE_ID } from "@/lib/const";
import { trackEvent } from "@/hooks/useGoogleAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { toast } from "sonner";

export default function Contact() {
    const { language, t } = useLanguage();
    const { theme, toggleTheme, switchable } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const ownerName = language === "vi" ? OWNER_NAME : OWNER_NAME_EN;
    const ownerLocation = language === "vi" ? OWNER_LOCATION : OWNER_LOCATION_EN;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error(t('contact.errorMessage'));
            return;
        }

        setIsLoading(true);

        try {
            // Track form submission
            trackEvent("contact_form_submit", {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
            });

            // Submit to Formspree
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                toast.success(t('contact.successMessage'));
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                toast.error(t('contact.errorMessage'));
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error(t('contact.errorMessage'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col" suppressHydrationWarning>
            {/* Navigation */}
            <nav className="sticky top-0 z-[100] bg-white dark:bg-slate-900 border-b border-border/50 shadow-sm">
                <div className="container py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-foreground hover:text-accent transition-smooth">
                        {ownerName}
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6">
                            <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                                {t('common.home')}
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                                {t('common.about')}
                            </Link>
                            <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                                {t('common.experiences')}
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">
                                {t('common.contact')}
                            </Link>
                        </div>
                        {switchable && toggleTheme && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-secondary transition-smooth"
                                aria-label="Toggle theme"
                            >
                                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                        )}
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 container py-12 md:py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-smooth mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    {t('common.backHome')}
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                                    {t('contact.name')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder={t('contact.namePlaceholder')}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                                    {t('common.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder={t('contact.emailPlaceholder')}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                                    {t('contact.subject')}
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder={t('contact.subjectPlaceholder')}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                                    {t('contact.message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                                    placeholder={t('contact.messagePlaceholder')}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? t('contact.sending') : t('contact.sendMessage')}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <aside className="lg:col-span-1">
                        <div className="bg-secondary p-6 rounded-lg border border-border sticky top-24">
                            <h3 className="text-lg font-bold text-foreground mb-6">{t('contact.contactInfo')}</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">{t('common.email')}</p>
                                        <a href={`mailto:${OWNER_EMAIL}`} className="text-accent hover:opacity-80 transition-smooth break-all">
                                            {OWNER_EMAIL}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">{t('common.phone')}</p>
                                        <a href={`tel:${OWNER_PHONE}`} className="text-accent hover:opacity-80 transition-smooth">
                                            {OWNER_PHONE}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">{t('common.address')}</p>
                                        <p className="text-foreground">{ownerLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border">
                                <p className="text-sm text-muted-foreground">
                                    {t('contact.responseTime')}
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-secondary border-t border-border mt-12">
                <div className="container py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                            © 2025 {ownerName}. {t('common.allRightsReserved')}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
