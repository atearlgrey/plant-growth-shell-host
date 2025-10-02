import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-growth',
  templateUrl: './plant-growth.component.html',
  styleUrls: ['./plant-growth.component.scss']
})
export class PlantGrowthComponent implements OnInit {
  ngOnInit(): void {
    const baseUrl = 'http://localhost:4301';
    const remoteEntry = `${baseUrl}/remoteEntry.js`;
    const remoteAssetPath = `${baseUrl}/assets/`;
    const remoteDataPath = `${baseUrl}/data/`;
    const module = './PhaserMount';

    // 👉 set asset base URL cho remote này
    (window as any).__assets__ = remoteAssetPath;
    (window as any).__data__ = remoteDataPath;
    loadRemoteModule({
      type: 'module',
      remoteEntry: remoteEntry, // cổng của remote
      exposedModule: module,
    }).then(m => m.startGame('phaser-container'));
  }
}