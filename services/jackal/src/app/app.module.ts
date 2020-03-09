import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';


import { hammerjs } from 'hammerjs';

import { ToastrModule } from 'ngx-toastr';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AssetComponent } from './shared/asset/asset.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CreateAssetComponent } from './portfolio/create-asset/create-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    SpinnerComponent,
    PortfolioComponent,
    AssetComponent,
    CreateAssetComponent
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
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    LayoutModule,

    ToastrModule.forRoot() 
  ],
  providers: [
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
  entryComponents: [
    CreateAssetComponent,
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
