import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { TravelDetailComponent } from './travels/travel-detail/travel-detail.component';
import { TravelEditComponent } from './travels/travel-edit/travel-edit.component';
import { TravelListComponent } from './travels/travel-list/travel-list.component';
import { TravelNewComponent } from './travels/travel-new/travel-new.component';
import { TravelStartComponent } from './travels/travel-start/travel-start.component';
import { TravelsComponent } from './travels/travels.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'travel', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    {path: 'travel/new', component: TravelNewComponent},
    {path: ':id/edit', component: TravelEditComponent},
    {path: 'travel', component: TravelsComponent, canActivate: [AuthGuard], children: [
        {path: '', component: TravelStartComponent},
        {path: ':id', component: TravelDetailComponent}
    ]
    },
    {path: 'travels', component: TravelListComponent}
    ]

@NgModule({
 imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
],
 exports: [RouterModule]
})

export class AppRoutingModule {}