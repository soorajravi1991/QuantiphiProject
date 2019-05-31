import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.gaurd';
const routes: Routes = [
	{
		path: '',
		// redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [AuthGuard],
		component: DashboardComponent
	},
	{
		path: 'dashboard',	
    pathMatch: 'full',
    canActivate: [AuthGuard],
		component: DashboardComponent

	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
  { 
    path: '**', 
    canActivate: [AuthGuard],
    component: DashboardComponent 
  },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

