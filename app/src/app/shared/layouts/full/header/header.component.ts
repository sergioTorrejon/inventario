import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { AuthorizationService } from 'src/app/authentication/services/authorization.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(public router: Router,
    public authenticationService: AuthenticationService,) {
  }
  onLoggedout() {
    console.log("deslogueo");
    localStorage.removeItem('usuario');
    this.router.navigate(['/authentication/login']);
  }
  ResetLoggedout() {
    this.router.navigate(['/authentication/reset']);
  }

  downloadManual() {
    this.authenticationService.getManual()
  .subscribe((res: any) => {
    var newBlob = new Blob([res], { type: "application/pdf" });
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = "Manual de Usuario.pdf";
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    setTimeout(function () {
        window.URL.revokeObjectURL(data);
    }, 100);
  }, (error: any) => {
      console.log(error);
  });
  }
}
