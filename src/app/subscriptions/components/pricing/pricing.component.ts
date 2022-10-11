import { Component, OnInit } from '@angular/core';
import { TypeSubscription } from '../../models/type-subscription';
import { TypeSubscriptionService } from '../../services/typeSubscription.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  prices: TypeSubscription[] = []

  constructor(
    private typesubservice: TypeSubscriptionService
  ) { }

  ngOnInit(): void {
    this.getTypeSubscriptions();
  }

  getTypeSubscriptions(){
    this.typesubservice.getTypes()
      .subscribe(
        res => {
          this.prices = res;
        }
      )
  }

  handleComments(str: string){
    let strArr = str.split(',');
    return strArr;
  }
}
