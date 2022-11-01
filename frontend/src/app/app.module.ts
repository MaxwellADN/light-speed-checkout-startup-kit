import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbIconModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DEFAULT_THEME } from 'src/theme.default';
import { COSMIC_THEME } from 'src/theme.cosmic';
import { CORPORATE_THEME } from 'src/theme.corporate';
import { DARK_THEME } from 'src/theme.dark';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LayoutService } from './core/utils';
import { ToastService } from './core/utils/toast.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DecimalPipe,
    DatePipe,
    LayoutService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('554589230264-mq5fpu02dbaijqu7l57gh661h3p9fe9p.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('565662111475026')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    ...(NbThemeModule.forRoot({ name: 'default' }, [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]).providers) || []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
