import vi from './vi.json';
import en from './en.json';

export type Language = 'vi' | 'en';

// Type for nested translation object
type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = typeof vi;

const translations: Record<Language, Translations> = { vi, en };

/**
 * Get a translation value by dot-notation key
 * @example t('common.home', 'vi') => 'Trang chủ'
 * @example t('home.title', 'en') => 'Construction Cost Engineer'
 */
export function getTranslation(key: string, language: Language): string {
    const keys = key.split('.');
    let value: TranslationValue = translations[language];

    for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
            value = value[k as keyof typeof value];
        } else {
            // Fallback to Vietnamese if key not found
            value = translations.vi;
            for (const fallbackKey of keys) {
                if (typeof value === 'object' && value !== null && fallbackKey in value) {
                    value = value[fallbackKey as keyof typeof value];
                } else {
                    return key; // Return the key itself if not found
                }
            }
            break;
        }
    }

    return typeof value === 'string' ? value : key;
}

/**
 * Get all translations for a specific section
 * @example getSection('home', 'vi') => { title: '...', subtitle: '...' }
 */
export function getSection<K extends keyof Translations>(
    section: K,
    language: Language
): Translations[K] {
    return translations[language][section];
}

export { translations };
export default translations;
