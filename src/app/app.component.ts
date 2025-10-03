import { Component } from '@angular/core';
import { RemoteConfigService } from '../services/remote-config.service';
import { Router } from '@angular/router';
import { DummyHostComponent } from './dummy-host/dummy-host.component';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private remoteCfg: RemoteConfigService,
    private langService: LanguageService
  ) {
    const staticRoutes = router.config;
    const dynamicRoutes = remoteCfg.getRoutes(DummyHostComponent);
    const mergedRoutes = [...staticRoutes, ...dynamicRoutes];
    router.resetConfig(mergedRoutes);
    console.log('[AppComponent] Final merged routes:', mergedRoutes);
  }

  switchLang(lang: string) {
    this.langService.setLanguage(lang);
  }
}
