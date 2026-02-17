import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './shared/components/dashboard/dashboard';
import { adminGuard } from './core/gaurds/admin-guard';
import { UserLayout } from './shared/components/user-layout/user-layout';
import { UserGuard } from './core/gaurds/user-gaurds';
export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'login',
        component: Login
    },
    {
 path:'register',
 loadComponent:()=>import('./features/auth/register/register')
 .then(m=>m.Register)
},
    {
  path: '',
  component: UserLayout,
  canActivate: [UserGuard],
  children: [

    { path: 'dashboard', component: Dashboard },

    {
      path: 'book/:id',
      loadComponent: () =>
        import('./features/booking/book-ticket/book-ticket')
        .then(m => m.BookTicket)
    },

    {
      path: 'my-bookings',
      loadComponent: () =>
        import('./features/booking/my-booking/my-booking')
        .then(m => m.MyBooking)
    }

  ]
},

{
 path:'admin',
    canActivate: [adminGuard],
 loadComponent:()=>import('./features/admin/admin-layout/admin-layout')
 .then(m=>m.AdminLayout),
 children:[
    {
     path:'',
     redirectTo:'dashboard',
     pathMatch:'full'
   },
   {
     path:'dashboard',
     loadComponent:()=>import('./features/admin/admin-dashboard/admin-dashboard')
     .then(m=>m.AdminDashboard)
   },
   {
     path:'flights',
     loadComponent:()=>import('./features/admin/flights-admin/flights-admin')
     .then(m=>m.FlightsAdmin)
   },
   {
     path:'airports',
     loadComponent:()=>import('./features/admin/airports-admin/airports-admin')
     .then(m=>m.AirportsAdmin)
   },
   {
 path:'bookings',
 loadComponent:()=>import('./features/admin/bookings-admin/bookings-admin')
 .then(m=>m.BookingsAdmin)
}
 ]
},

    {
        path: '**',
        redirectTo: ''
    }
];
