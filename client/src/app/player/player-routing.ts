import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

//import { PlayerProfileEditComponent } from './player-profile-edit/player-profile-edit.component';
import { PlayerProfileEditContainerComponent } from './player-profile-edit/player-profile-edit-container.component';

const routes: Routes = [
    // this path is lazy loaded so it is '' here
    {path: '',
      children: [
//        {path: 'list', component: ClubListContainerComponent, canActivate: [AuthGuard] },
//        {path: 'add', component: ClubEditContainerComponent, canActivate: [AuthGuard] },
        {path: 'edit/:id', component: PlayerProfileEditContainerComponent, canActivate: [AuthGuard] }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
