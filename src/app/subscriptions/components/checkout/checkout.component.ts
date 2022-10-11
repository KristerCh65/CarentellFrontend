import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeSubscription } from '../../models/type-subscription';
import { TypeSubscriptionService } from '../../services/typeSubscription.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  typeSubscription?: TypeSubscription;

  constructor(
    private typeSubscriptionService: TypeSubscriptionService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.getTypeSubscriptionId();
  }

  getTypeSubscriptionId(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getTypeSubscriptionById(id);
    }
  }

  getTypeSubscriptionById(id: any){
    this.typeSubscriptionService.getTypeSubscription(id)
      .subscribe(
        res => {
          console.log(res);
          this.typeSubscription = res;
        }
      )
  }

  handleComments(str: string){
    let strArr = str.split(',');
    return strArr[0];
  }

}
