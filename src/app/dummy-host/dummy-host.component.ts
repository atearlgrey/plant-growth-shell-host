import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-dummy-host',
  templateUrl: './dummy-host.component.html',
  styleUrls: ['./dummy-host.component.scss']
})
export class DummyHostComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  ngAfterViewInit(): void {
  }
}