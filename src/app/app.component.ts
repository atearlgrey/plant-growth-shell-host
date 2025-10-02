import { Component} from '@angular/core';
import { RemoteConfigService } from '../services/RemoteConfigService';
import { Router } from '@angular/router';
import { DummyHostComponent } from './dummy-host/dummy-host.component';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(router: Router, remoteCfg: RemoteConfigService) {
    const staticRoutes = router.config;
    const dynamicRoutes = remoteCfg.getRoutes(DummyHostComponent);
    const mergedRoutes = [...staticRoutes, ...dynamicRoutes];
    router.resetConfig(mergedRoutes);
    console.log('[AppComponent] Final merged routes:', mergedRoutes);
  }
}
