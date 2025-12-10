"use client";

import { ArrowLeft, Download, Moon, Sun } from "lucide-react";
import { OWNER_NAME, OWNER_NAME_EN, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, OWNER_LOCATION_EN, EXPERIENCES, CV_FILE_PATH, SOFTWARE_SKILLS } from "@/lib/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";

export default function About() {
    const { language, t } = useLanguage();
    const { theme, toggleTheme, switchable } = useTheme();

    const ownerName = language === "vi" ? OWNER_NAME : OWNER_NAME_EN;
    const ownerLocation = language === "vi" ? OWNER_LOCATION : OWNER_LOCATION_EN;

    // Skill ratings (1-5)
    const skillRatings = [
        { name: language === "vi" ? "Bóc tách khối lượng" : "Quantity Surveying", rating: 5 },
        { name: language === "vi" ? "Lập hồ sơ dự thầu" : "Bid Preparation", rating: 5 },
        { name: language === "vi" ? "Thanh quyết toán" : "Project Settlement", rating: 5 },
        { name: language === "vi" ? "Quản lý dự án" : "Project Management", rating: 4 },
        { name: language === "vi" ? "Microsoft Office" : "Microsoft Office", rating: 5 },
        { name: language === "vi" ? "AutoCAD" : "AutoCAD", rating: 5 },
        { name: language === "vi" ? "G8" : "G8", rating: 4 },
    ];

    const renderRatingBars = (rating: number) => {
        return (
            <div className="flex items-center gap-3">
                <div className="flex gap-1.5 flex-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 flex-1 rounded-sm ${i < rating ? "bg-accent" : "bg-border"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-sm font-semibold text-muted-foreground min-w-[2.5rem] text-right">
                    {rating}/5
                </span>
            </div>
        );
    };

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
                            <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                                {t('common.home')}
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">{t('common.about')}</Link>
                            <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                                {t('common.experiences')}
                            </Link>
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

            {/* Main Content */}
            <main className="flex-1 container py-12 md:py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-smooth mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    {t('common.backHome')}
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {ownerName}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        {t('about.subtitle')}
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 flex-wrap">
                            <a href={`mailto:${OWNER_EMAIL}`} className="text-accent hover:opacity-80 transition-smooth">
                                {OWNER_EMAIL}
                            </a>
                            <span className="text-muted-foreground">•</span>
                            <a href={`tel:${OWNER_PHONE}`} className="text-accent hover:opacity-80 transition-smooth">
                                {OWNER_PHONE}
                            </a>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                                {ownerLocation}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = CV_FILE_PATH;
                                link.download = "CV_Nguyen_Manh_Dat.pdf";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            className="w-fit px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            {t('common.downloadCV')}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl">
                    {/* About Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{t('about.introduction')}</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>{t('about.introText1')}</p>
                            <p>{t('about.introText2')}</p>
                        </div>
                    </section>

                    {/* Skills Section with Rating Bars */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8">{t('about.skills')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {skillRatings.map((skill, index) => (
                                <div key={index} className="space-y-2">
                                    <span className="text-foreground font-medium block">{skill.name}</span>
                                    {renderRatingBars(skill.rating)}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Software Skills Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8">{t('about.software')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {SOFTWARE_SKILLS.map((software, index) => (
                                <div key={index} className="bg-secondary p-4 rounded-lg border border-border text-center hover:bg-accent/10 transition-smooth flex flex-col items-center">
                                    <div className="h-16 w-16 mb-3 flex items-center justify-center relative">
                                        {software.iconPath ? (
                                            <img
                                                src={software.iconPath}
                                                alt={software.name}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-4xl">{software.icon}</span>
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">{software.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-8">{t('about.experience')}</h2>
                        <div className="space-y-8">
                            {EXPERIENCES.map((exp) => (
                                <div key={exp.id} className="border-l-2 border-accent pl-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                        <h3 className="text-lg font-bold text-foreground">
                                            {language === "vi" ? exp.title_vi : exp.title_en}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                                    </div>
                                    <p className="text-accent font-semibold mb-2">{exp.company}</p>
                                    <p className="text-muted-foreground mb-3">
                                        {language === "vi" ? exp.description_vi : exp.description_en}
                                    </p>
                                    <ul className="space-y-2">
                                        {(language === "vi" ? exp.responsibilities_vi : exp.responsibilities_en).map((resp, idx) => (
                                            <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                                                <span className="text-accent mt-1">•</span>
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{t('about.education')}</h2>
                        <div className="border-l-2 border-accent pl-6">
                            <h3 className="text-lg font-bold text-foreground">
                                {t('about.educationDegree')}
                            </h3>
                            <p className="text-accent font-semibold mb-2">
                                {t('about.educationSchool')}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">09/2012 - 03/2017</p>
                            <p className="text-muted-foreground">
                                {t('about.educationGrade')}
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 bg-background border-t border-border text-center text-muted-foreground">
                <p>© 2025 {ownerName}. {t('common.allRightsReserved')}</p>
            </footer>
        </div>
    );
}
