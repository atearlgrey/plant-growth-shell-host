import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANG_KEY = 'app_lang';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private fallbackLang = 'en';
  private supportedLangs = ['en', 'vi'];

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  initLanguage(): void {
    const savedLang = localStorage.getItem(LANG_KEY);
    const browserLang = this.translate.getBrowserLang() ?? 'en';

    const langToUse =
      savedLang && this.isSupported(savedLang)
        ? savedLang
        : this.isSupported(browserLang)
        ? browserLang
        : this.fallbackLang;

    this.setLanguage(langToUse);
  }

  setLanguage(lang: string): void {
    if (this.isSupported(lang)) {
      this.translate.setDefaultLang(this.fallbackLang);
      this.translate.use(lang);
      localStorage.setItem(LANG_KEY, lang);
    }
  }

  getCurrentLang(): string {
    return this.translate.currentLang || this.fallbackLang;
  }

  getSupportedLangs(): string[] {
    return this.supportedLangs;
  }

  private isSupported(lang: string | null): boolean {
    return !!lang && this.supportedLangs.includes(lang);
  }
}
