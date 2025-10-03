import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { LanguageService } from '../services/language.service';
import { RemoteConfigService } from '../services/remote-config.service';
import { DummyHostComponent } from './dummy-host/dummy-host.component';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: MenuItem[] = [];
  constructor(
    private router: Router,
    private remoteCfg: RemoteConfigService,
    private langService: LanguageService,
  ) {
    const staticRoutes = router.config;
    const dynamicRoutes = remoteCfg.getRoutes(DummyHostComponent);
    const mergedRoutes = [...staticRoutes, ...dynamicRoutes];
    router.resetConfig(mergedRoutes);
    console.log('[AppComponent] Final merged routes:', mergedRoutes);

    const routerMenu: MenuItem[] = mergedRoutes
      .filter((r) => r.path)
      .map((r) => ({ label: r.path, routerLink: r.path }));
    const fixedMenu: MenuItem[] = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-home' },
          { label: 'Bookmarks', icon: 'pi pi-bookmark', badge: '3' },
          { label: 'Team', icon: 'pi pi-users' },
          { label: 'Messages', icon: 'pi pi-envelope', badge: '1' },
          { label: 'Calendar', icon: 'pi pi-calendar' },
        ],
      },
      {
        label: 'Organization',
        items: [
          { label: 'Overview', icon: 'pi pi-sitemap' },
          {
            label: 'Security',
            icon: 'pi pi-shield',
            items: [
              { label: 'Domains', icon: 'pi pi-globe' },
              { label: 'Reports', icon: 'pi pi-file', badge: '4' },
            ],
          },
        ],
      },
      {
        label: 'Setting',
        items: [
          {
            label: 'Language',
            icon: 'pi pi-home',
            items: [
              { label: 'English', command: () => this.switchLang('en') },
              { label: 'Vietnamese', command: () => this.switchLang('vi') },
            ],
          },
        ],
      },
    ];
    this.items = routerMenu.concat(fixedMenu);
  }

  switchLang(lang: string) {
    this.langService.setLanguage(lang);
  }
}
