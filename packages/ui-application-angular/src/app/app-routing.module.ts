import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HaveAuthorizationGuard } from './core/have-authorization.guard';
import { HaveNotAuthorizationGuard } from './core/have-not-authorization.guard';

const routes: Routes = [
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule),
    canLoad: [],
    canActivate: [HaveNotAuthorizationGuard]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule),
    canLoad: [],
    canActivate: [HaveNotAuthorizationGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canLoad: [],
    canActivate: [HaveAuthorizationGuard]
  },
  { 
    path: '',   
    redirectTo: '/sign-in', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/sign-in',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
