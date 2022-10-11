import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
