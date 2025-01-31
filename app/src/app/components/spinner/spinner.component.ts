import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from 'src/app/services/components/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="preloader" *ngIf="isSpinnerVisible" style="background: rgba(255, 255, 255, 0.66)" >
  <div class="spinner">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>
</div>`,
encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit {

  isSpinnerVisible = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.isSpinnerVisible = (status === 'start');
      this.cdRef.detectChanges();
    });
  }
}
