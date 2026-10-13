import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoaderSpinnerService } from '../../services/loader-spinner.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, AfterContentChecked {

  isDemo = environment.demo;

  constructor(
    public loadingService: LoaderSpinnerService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

}
