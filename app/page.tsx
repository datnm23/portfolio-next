"use client";

import { Mail, Phone, MapPin, ArrowRight, Linkedin, Github, Facebook, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { OWNER_NAME, OWNER_NAME_EN, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, OWNER_LOCATION_EN, SOCIAL_LINKS, AVATAR_URL } from "@/lib/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
    const { language, t } = useLanguage();
    const { theme, toggleTheme, switchable } = useTheme();

    const ownerName = language === "vi" ? OWNER_NAME : OWNER_NAME_EN;
    const ownerLocation = language === "vi" ? OWNER_LOCATION : OWNER_LOCATION_EN;

    return (
        <div className="min-h-screen flex flex-col bg-background" suppressHydrationWarning>
            {/* Navigation */}
            <nav className="sticky top-0 z-[100] bg-white dark:bg-slate-900 border-b border-border/50 shadow-sm">
                <div className="container py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-foreground hover:text-accent transition-smooth">
                        {ownerName}
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6">
                            <Link href="/" className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">{t('common.home')}</Link>
                            <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t('common.about')}</Link>
                            <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t('common.experiences')}</Link>
                            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t('common.contact')}</Link>
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

            {/* Hero Section - Split Layout */}
            <section className="flex-1 py-12 md:py-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="space-y-6 order-2 lg:order-1">
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                                {ownerName}
                            </h1>
                            <p className="text-2xl md:text-3xl font-semibold text-foreground">
                                {t('home.title')}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('home.description')}
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {SOCIAL_LINKS.linkedin && (
                                    <a
                                        href={SOCIAL_LINKS.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                                        title="LinkedIn"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {SOCIAL_LINKS.github && (
                                    <a
                                        href={SOCIAL_LINKS.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                                        title="GitHub"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                                {SOCIAL_LINKS.facebook && (
                                    <a
                                        href={SOCIAL_LINKS.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                                        title="Facebook"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                )}
                                {SOCIAL_LINKS.email && (
                                    <a
                                        href={`mailto:${SOCIAL_LINKS.email}`}
                                        className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                                        title="Email"
                                    >
                                        <Mail size={20} />
                                    </a>
                                )}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/portfolio" className="min-h-[48px] px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2">
                                    {t('home.viewWork')}
                                    <ArrowRight size={18} />
                                </Link>
                                <Link href="/contact" className="min-h-[48px] px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-smooth flex items-center justify-center">
                                    {t('home.letsConnect')}
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Profile Image */}
                        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                            <div className="relative">
                                {/* Glow effect background */}
                                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110"></div>
                                {/* Profile image */}
                                <img
                                    src={AVATAR_URL}
                                    alt={ownerName}
                                    className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-accent/30 shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-20 md:py-32 bg-secondary/20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            {t('home.aboutMe')} <span className="text-accent">{t('home.aboutMeHighlight')}</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('home.aboutDescription')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-4 bg-accent/10 rounded-full">
                                <Mail className="text-accent" size={24} />
                            </div>
                            <div suppressHydrationWarning>
                                <p className="text-sm text-muted-foreground mb-1">{t('common.email')}</p>
                                <a href={`mailto:${OWNER_EMAIL}`} className="font-semibold text-foreground hover:text-accent transition-smooth">
                                    {OWNER_EMAIL}
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-4 bg-accent/10 rounded-full">
                                <Phone className="text-accent" size={24} />
                            </div>
                            <div suppressHydrationWarning>
                                <p className="text-sm text-muted-foreground mb-1">{t('common.phone')}</p>
                                <a href={`tel:${OWNER_PHONE}`} className="font-semibold text-foreground hover:text-accent transition-smooth">
                                    {OWNER_PHONE}
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-4 bg-accent/10 rounded-full">
                                <MapPin className="text-accent" size={24} />
                            </div>
                            <div suppressHydrationWarning>
                                <p className="text-sm text-muted-foreground mb-1">{t('common.address')}</p>
                                <p className="font-semibold text-foreground">
                                    {ownerLocation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-secondary/30 border-t border-border text-center text-muted-foreground">
                <p className="text-sm">© 2025 {ownerName}. {t('common.allRightsReserved')}</p>
            </footer>
        </div>
    );
}
