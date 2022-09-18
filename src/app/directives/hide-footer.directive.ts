import {
  AfterViewInit,
  Directive,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appFooter]',
})
export class HideFooterDirective implements AfterViewInit {
  @Input() appFooter: any;
  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  @HostListener('ionScroll', ['$event'])
  onContentScroll(event: ScrollCustomEvent) {
    if (event.detail.scrollTop > 1300) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.appFooter, 'bottom', '0px');
      });
    } else {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.appFooter, 'bottom', '-56px');
      });
    }
  }

  ngAfterViewInit(): void {
    this.appFooter = this.appFooter.el;
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.appFooter,
        'webkitTransition',
        'bottom 700ms'
      );
      this.renderer.setStyle(this.appFooter, 'bottom', '-56px');
    });
  }
}
