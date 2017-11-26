import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { ClubListContainerComponent } from './club-list/club-list-container.component';
import { ClubEditContainerComponent } from './club-edit/club-edit-container.component';

const routes: Routes = [
    {path: 'club/list', component: ClubListContainerComponent, canActivate: [AuthGuard] },
    {path: 'club/add', component: ClubEditContainerComponent, canActivate: [AuthGuard] },
    {path: 'club/edit/:id', component: ClubEditContainerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule { }
