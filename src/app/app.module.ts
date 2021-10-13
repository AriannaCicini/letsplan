import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TravelDetailComponent } from './travels/travel-detail/travel-detail.component';
import { TravelListComponent } from './travels/travel-list/travel-list.component';
import { TravelsComponent } from './travels/travels.component';
import { TravelEditComponent } from './travels/travel-edit/travel-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective} from './dropdown.directive';
import { TravelItemComponent } from './travels/travel-list/travel-item/travel-item.component';
import { AuthComponent } from './auth/auth.component';
import { TravelService } from './travels/travel.service';
import { TravelNewComponent } from './travels/travel-new/travel-new.component';
import { TravelStartComponent } from './travels/travel-start/travel-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TravelDetailComponent,
    TravelListComponent,
    TravelItemComponent,
    TravelsComponent,
    TravelEditComponent,
    DropdownDirective,
    AuthComponent,
    TravelNewComponent,
    TravelStartComponent,
    TravelStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TravelService],
  bootstrap: [AppComponent]
})

export class AppModule { }
