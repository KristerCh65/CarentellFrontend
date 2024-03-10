import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carsFilter'
})
export class CarsFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    let resultCars = [];

    for (let result of value){
      if(result.make.description.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultCars.push(result);
      };

      if(result.model.description.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultCars.push(result);
      };

      if(result.year.toString().indexOf(arg.toLowerCase()) > -1){
        resultCars.push(result);
      };

      if(result.price.toString().indexOf(arg.toLowerCase()) > -1){
        resultCars.push(result);
      };

      // if(result.status.indexOf(arg) > -1){
      //   resultCars.push(result);
      // };

      // if(result.createdDate.indexOf(arg) > -1){
      //   resultCars.push(result);
      // };
    }
    return resultCars;


  }

  

}
