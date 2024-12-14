import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HistoryComponent } from './pages/history/history.component';
import { AdminEventosComponent } from './pages/admin-eventos/admin-eventos.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'event-details/:id', component: EventDetailsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'events', component: EventsComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'admin',  component: AdminEventosComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

