import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from 'src/app/cars/models/category';
import { Make } from 'src/app/cars/models/make';
import { Model } from 'src/app/cars/models/model';
import { Transmisions } from 'src/app/cars/models/transmisions.enum';
import { CarsService } from 'src/app/cars/services/cars.service';
import { CategoriesService } from 'src/app/cars/services/categories.service';
import { MakesService } from 'src/app/cars/services/makes.service';
import { ModelsService } from 'src/app/cars/services/models.service';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  makes: Make[] = [];
  models: Model[] = [];
  categories: Category[] = [];

  eTransmisions = Transmisions;

  carForm: FormGroup;
  user: number = 0;

  constructor(
    private makesService: MakesService,
    private modelsService: ModelsService,
    private categoriesService: CategoriesService,
    private carService: CarsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.carForm = this.buildForm();
  }

  ngOnInit(): void {
    this.getMakes();
    this.getCategories();
    this.getLoggedUser();
  }

  buildForm(){
    return this.formBuilder.group({
      id: [0, [Validators.required]],
      description: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      makeId: [0, [Validators.required]],
      modelId: [0, [Validators.required]],
      year: [0, [Validators.required]],
      color: ['', [Validators.required]],
      engine: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
      kilometers: [0, [Validators.required]],
      direction: ['', [Validators.required]],
      contactId: [0, [Validators.required]],
      categoryId: [0, [Validators.required]],
      price: [0, [Validators.required]],
      status: [0, [Validators.required]],
      discount: [0],
      isSale: [false, [Validators.required]],
      locationId: [0, [Validators.required]],
      extras: this.formBuilder.array([]),
      fotos: this.formBuilder.array([])
    })
  }

  buildPhotos(){
    return this.formBuilder.group({
      photo: null
    });
  }

  get extras(){
    return this.carForm.get('extras') as FormArray;
  }

  get fotos(){
    return this.carForm.get('fotos') as FormArray;
  }

  addExtra(){
    const extraFormGroup = this.formBuilder.group({
      Description: ''
    });
    this.extras.push(extraFormGroup);
  }

  addFoto(){
    const foto = this.formBuilder.group({
      photo: null
    });
    this.fotos.push(foto);
  }

  removeFoto(i: number){
    this.fotos.removeAt(i);
  }

  removeExtra(i: number){
    this.extras.removeAt(i);
  }

  getMakes(){
    this.makesService.getMakes()
      .subscribe(
        (res) => {
          this.makes = res.map(make => {
            return {
              makeID: make.makeID,
              description: make.description
            }
          });
        }
      )
  }

  getModels(){
    this.modelsService.getModelsByMake(parseInt(this.carForm.controls.makeId.value ?? ''))
      .subscribe(res => {
        console.log(res)
        this.models = res.map(model => {
          return {
            modelID: model.modelID,
            description: model.description
          }
        })
      })
  }

  getCategories(){
    this.categoriesService.getCategories()
    .subscribe(
      res => {
          this.categories = res.map(category => {
            return {
              categoryID: category.categoryID,
              description: category.description
            }
          })
      })
  }

  getLoggedUser(){
    this.authService.loggedUser$
      .subscribe(loggedUser => {
        this.getContactId(loggedUser.id);
      })
  }

  getContactId(userId: number){
    this.profileService.getProfileInformationById(userId)
      .subscribe(contac => {
        console.log({contac})
        this.user = contac.contactID;
        this.carForm.get('locationId')?.setValue(contac.address.id);
      })
  }

  onFileChange(event: any, index: number){
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotos.at(index).get('photo')?.setValue(file);
    }
  }

  test(){
    this.carForm.controls.contactId.setValue(this.user);
    console.log(this.carForm.value)
  }

  saveCar(){
    this.carForm.controls.contactId.setValue(this.user);
    const car = this.carForm.value;
    
    const formData: any = new FormData();
    formData.append("makeId", this.carForm.get('makeId')?.value)
    formData.append("description", this.carForm.get('description')?.value)
    formData.append("modelId", this.carForm.get('modelId')?.value)
    formData.append("year", this.carForm.get('year')?.value)
    formData.append("plate", this.carForm.get('plate')?.value)
    formData.append("color", this.carForm.get('color')?.value)
    formData.append("categoryId", this.carForm.get('categoryId')?.value)
    formData.append("transmission", this.carForm.get('transmission')?.value)
    formData.append("engine", this.carForm.get('engine')?.value)
    formData.append("fuel", this.carForm.get('fuel')?.value)
    formData.append("kilometers", this.carForm.get('kilometers')?.value)
    formData.append("direction", this.carForm.get('direction')?.value)
    formData.append("contactId", this.carForm.get('contactId')?.value)
    formData.append("price", this.carForm.get('price')?.value)
    formData.append("status", this.carForm.get('status')?.value)
    formData.append("isSale", this.carForm.get('isSale')?.value)
    formData.append("locationId", this.carForm.get('locationId')?.value)
    formData.append("extrasList", JSON.stringify(this.extras.value))
    for (let x = 0; x < this.fotos.length; x++){
      formData.append("fotos", this.fotos.at(x).get('photo')?.value);
    }
    console.log(formData.getAll("fotos"));
    console.log(this.carForm.value);
    this.carService.saveCar(formData)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Se ha guardado el auto.', 'Auto Guardado')
          this.router.navigate(["/profile/details"]);
        },
        error => {
          this.toastr.error('An error has occurred', 'Error');
          console.log(error);
        }
      )
      
  }

}
