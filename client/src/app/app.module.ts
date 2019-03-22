import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonlaayoutComponent } from './commonlaayout/commonlaayout.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AngularFireModule } from 'angularfire2'
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component'
import { AdminauthGuard } from './guards/auth.guard';
import { AdminauthService } from './services/adminauth.service';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'concepts', component: TutorialsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createpost', component: CreatepostComponent, canActivate: [AdminauthGuard] },
  { path: "admin", component: AdminLoginComponent},
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CommonlaayoutComponent,
    AboutComponent,
    ContactComponent,
    TutorialsComponent,
    PagenotfoundComponent,
    HomeComponent,
    SearchResultComponent,
    CreatepostComponent,
    CategoryDetailComponent,
    UcfirstPipe,
    AdminLoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule
  ],
  providers: [AdminauthGuard, AdminauthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

