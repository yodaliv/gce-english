import { Component } from '@angular/core';
import { ChildActivationEnd, NavigationEnd, NavigationStart, RouteConfigLoadEnd, Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { Role } from './core/models/auth';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  Role = Role;
  isLoading = false;
  loader: HTMLIonLoadingElement = null;

  constructor(
    public authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loadingController: LoadingController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.router.events.subscribe( async event => {
      if (event instanceof NavigationStart) {
        if (!this.isLoading) {
          this.isLoading = true;
          this.loader =  await this.loadingController.create({message: 'Please wait...'});
          if (this.isLoading) {
            this.loader.present();
          }
        }
      }
      if (event instanceof NavigationEnd ||
        event instanceof RouteConfigLoadEnd ||
        event instanceof ChildActivationEnd) {
          this.isLoading = false;
          if (this.loader !== null) {
            await this.loader.dismiss();
          }
      }
    });
  }

  async logout() {
    await this.authService.logout();
  }
}
