import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AuthorizationService } from '../../../../authentication/services/authorization.service';
import { MenuItems } from 'src/app/shared/menu/menu-model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('isExpanded', style({transform: 'rotate(180deg)'})),
      state('childisExpanded', style({transform: 'rotate(180deg)'})),
      transition('isExpanded <=> collapsed',
      animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isExpanded = false;
  // childisExpanded = false;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public router: Router,
    public authorizationService: AuthorizationService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLoggedout() {
    console.log('deslogueo');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
}
}
