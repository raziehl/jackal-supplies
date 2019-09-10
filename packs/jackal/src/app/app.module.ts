import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogTitle, MatDialogContent, MatDialogClose, MatTooltipModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { hammerjs } from 'hammerjs';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/auth.interceptor';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { PortforlioComponent } from './portforlio/portforlio.component';
import { AssetComponent } from './shared/asset/asset.component';


@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    SpinnerComponent,
    CreateAssetComponent,
    PortforlioComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatProgressSpinnerModule,

    ToastrModule.forRoot() 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: true}
    }
  ],
  schemas: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
