import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { DemoApiInterceptor } from './core/interceptors/demo-api.interceptor';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    ...(environment.demo
      ? [{ provide: HTTP_INTERCEPTORS, useClass: DemoApiInterceptor, multi: true }]
      : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
