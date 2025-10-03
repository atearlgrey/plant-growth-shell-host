import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dummy-host',
  templateUrl: './dummy-host.component.html',
  styleUrls: ['./dummy-host.component.scss'],
})
export class DummyHostComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef, static: true }) vcr!: ViewContainerRef;

  private sub?: Subscription;
  private gameDestroyer?: () => void;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.data.subscribe((data) => {
      this.mountRemote(data['remote']);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.vcr.element.nativeElement.innerHTML = '';

    // ✅ Huỷ game khi component destroy
    if (this.gameDestroyer) {
      this.gameDestroyer();
      this.gameDestroyer = undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mountRemote(remote: any) {
    if (remote?.bootstrapFn) {
      this.vcr.element.nativeElement.innerHTML = '';

      const el = document.createElement('div');
      el.id = 'phaser-container';
      el.style.width = '100%';
      el.style.height = '100%';
      this.vcr.element.nativeElement.appendChild(el);
      setTimeout(() => {
        const game = remote.bootstrapFn('phaser-container');
        if (remote.destroyFn) {
          this.gameDestroyer = remote.destroyFn;
        } else if (game?.destroy) {
          this.gameDestroyer = () => game.destroy(true);
        }
      });
    }
  }
}
