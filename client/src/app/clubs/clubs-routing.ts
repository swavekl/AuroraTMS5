import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { ClubListContainerComponent } from './club-list/club-list-container.component';
import { ClubEditContainerComponent } from './club-edit/club-edit-container.component';

const routes: Routes = [
    // this path is lazy loaded so it is '' here
    {path: '',
      children: [
        {path: 'list', component: ClubListContainerComponent, canActivate: [AuthGuard] },
        {path: 'add', component: ClubEditContainerComponent, canActivate: [AuthGuard] },
        {path: 'edit/:id', component: ClubEditContainerComponent, canActivate: [AuthGuard] }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule { }
