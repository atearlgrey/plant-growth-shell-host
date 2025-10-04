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
      // clear old content
      this.vcr.element.nativeElement.innerHTML = '';
      setTimeout(() => {
        const gameOrCleanup = remote.bootstrapFn(this.vcr.element.nativeElement);

        if (remote.destroyFn) {
          this.gameDestroyer = remote.destroyFn;
        } else if (gameOrCleanup?.destroy) {
          // trường hợp là Phaser Game instance
          this.gameDestroyer = () => gameOrCleanup.destroy(true);
        } else if (typeof gameOrCleanup === 'function') {
          // trường hợp là Three.js cleanup function
          this.gameDestroyer = gameOrCleanup;
        }
      });
    }
  }
}
