import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DictatorsComponent } from './components/dictators/dictators.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { DictatorEditorComponent } from './components/dictator-editor/dictator-editor.component';

const appRoutes: Routes = [
  { path: 'dictators', component: DictatorsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**',
    redirectTo: '/dictators',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DictatorsComponent,
    ProfileComponent,
    NavbarComponent,
    TweetComponent,
    DictatorEditorComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
