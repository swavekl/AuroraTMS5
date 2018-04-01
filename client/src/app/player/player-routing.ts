import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { PlayerProfileListContainerComponent } from './player-profile-list/player-profile-list-container.component';
import { PlayerProfileEditContainerComponent } from './player-profile-edit/player-profile-edit-container.component';

const routes: Routes = [
    // this path is lazy loaded so it is '' here
    {path: '',
      children: [
        {path: 'list**', component: PlayerProfileListContainerComponent, canActivate: [AuthGuard] },
        {path: 'add', component: PlayerProfileEditContainerComponent, canActivate: [AuthGuard] },
        {path: 'edit', component: PlayerProfileEditContainerComponent, canActivate: [AuthGuard] }
//        {path: 'edit/:id', component: PlayerProfileEditContainerComponent, canActivate: [AuthGuard] }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
