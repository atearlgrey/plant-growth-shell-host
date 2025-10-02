import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { firstValueFrom } from 'rxjs';
import { DummyHostComponent } from '../app/dummy-host/dummy-host.component';


interface Manifest {
  remotes: RemoteManifestEntry[]
}

interface RemoteManifestEntry {
  path: string;
  remoteBaseUrl: string;
  remoteEntry: string;
  exposedModule: string;
  bootstrapFn?: string;
}

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private manifest: Manifest = { remotes: [] };

  constructor(private http: HttpClient) { }

  async load(): Promise<void> {
    try {
      const cfg = await firstValueFrom(
        this.http.get<Manifest>('/assets/manifest.json')
      );
      this.manifest = cfg;
      console.log('[RemoteConfigService] Manifest loaded:', this.manifest);
    } catch (error) {
      console.error('[RemoteConfigService] Failed to load manifest.json', error);
    }
  }

  getRoutes(hostComponent: Type<any>): Routes {
    const entries = Object.values(this.manifest.remotes || []);

    const routes: Routes = entries.map((entry: RemoteManifestEntry) => ({
      path: entry.path,
      component: hostComponent,
      resolve: {
        remote: this.remoteResolver(entry)
      }
    }));

    // 👉 Redirect root to first route
    if (entries.length > 0) {
      routes.push({ path: '', redirectTo: entries[0].path, pathMatch: 'full' });
    }

    console.log('[RemoteConfigService] Generated routes:', routes);
    return routes;
  }

  private remoteResolver(entry: RemoteManifestEntry) {
    return () => {
      (window as any).__baseUrl__ = entry.remoteBaseUrl;
      return loadRemoteModule({
        type: 'module',
        remoteEntry: new URL(entry.remoteEntry, entry.remoteBaseUrl).toString(),
        exposedModule: entry.exposedModule,
      }).then(m => {
        console.log(`[RemoteConfigService] Loaded module for: ${entry.path}`);
        if (entry.bootstrapFn && typeof m[entry.bootstrapFn] === 'function') {
          m[entry.bootstrapFn]('phaser-container');
        }
        return true;
      }).catch(err => {
        console.error(`[RemoteConfigService] Failed to load remote module: ${entry.path}`, err);
        return false;
      });
    }
  }
}
