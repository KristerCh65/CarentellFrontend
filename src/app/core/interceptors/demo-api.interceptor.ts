import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { delay, dematerialize, materialize, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/cars/models/car';
import { Transmisions } from 'src/app/cars/models/transmisions.enum';
import {
  CARS,
  CATEGORIES,
  CONTACTS,
  DEMO_USER_ID,
  DEPARTMENTS,
  MAKES,
  MODELS,
  TOWNSHIPS,
  TYPE_SUBSCRIPTIONS
} from '../demo/demo-data';

// Answers API calls with sample data when environment.demo is true,
// so the frontend works without the backend (e.g. on GitHub Pages).
@Injectable()
export class DemoApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(environment.api_url)) {
      return next.handle(request);
    }

    const path = request.url.substring(environment.api_url.length).split('/').filter(p => p);
    const body = this.handle(request, path);

    const response$ = body === undefined
      ? throwError(() => new HttpErrorResponse({ status: 404, url: request.url }))
      : of(new HttpResponse({ status: 200, body }));

    // Small delay so the loading spinner behaves like a real request
    return response$.pipe(materialize(), delay(250), dematerialize());
  }

  private handle(request: HttpRequest<any>, path: string[]): any {
    const [resource, action, param] = [path[0]?.toLowerCase(), path[1], path[2]];
    const id = Number(param ?? action);

    switch (resource) {
      case 'auth':
        return this.login(request.body?.userName);

      case 'cars':
        return this.cars(request, action, param);

      case 'category':
        return CATEGORIES;

      case 'makes':
        return MAKES;

      case 'models':
        return MODELS.filter(m => m.makeId === id)
          .map(({ modelID, description }) => ({ modelID, description }));

      case 'contacts':
        if (request.method !== 'GET') {
          return { ...request.body, messageError: null };
        }
        return action === 'get-by-user-id'
          ? CONTACTS.find(c => c.userId === id) ?? { messageError: 'Contacto no encontrado' }
          : CONTACTS.find(c => c.contactID === id);

      case 'address':
        return CONTACTS[0].address;

      case 'department':
        return DEPARTMENTS;

      case 'township':
        return TOWNSHIPS.filter(t => t.departmentId === id);

      case 'typesubscription':
        return action ? TYPE_SUBSCRIPTIONS.find(t => t.typeSubscryptionID === id) : TYPE_SUBSCRIPTIONS;

      case 'subscriptions':
        return this.subscription(request.body?.typeSubscriptionId ?? 1);

      case 'reservations':
        return { ...request.body, id: Date.now(), errorMessage: null };
    }

    return undefined;
  }

  private cars(request: HttpRequest<any>, action?: string, param?: string): any {
    const id = Number(param);

    switch (action) {
      case undefined:
        return CARS;
      case 'get-car-by-id':
        return CARS.find(c => c.id === id);
      case 'get-cars-by-category':
        return CARS.filter(c => c.categoryId === id);
      case 'get-cars-by-make':
        return CARS.filter(c => c.makeId === id);
      case 'get-cars-by-model':
        return CARS.filter(c => c.modelId === id);
      case 'get-cars-for-rent':
        return CARS.filter(c => !c.isSale);
      case 'get-cars-by-user':
        // The profile page reads photos from `fotos` instead of `photos`
        return CARS.filter(c => c.contactId === id).map(c => ({ ...c, fotos: c.photos }));
      case 'get-cars-by-arguments': {
        const search = decodeURIComponent(param ?? '').toLowerCase();
        return CARS.filter(c =>
          [c.make.description, c.model.description, c.year, c.color, c.category.description]
            .some(value => value.toString().toLowerCase().includes(search))
        );
      }
      case 'create-car':
        return this.createCar(request.body as FormData);
    }

    return undefined;
  }

  // Adds the new car to the in-memory list for the rest of the session
  private createCar(form: FormData): Car {
    const modelId = Number(form.get('modelId'));
    const model = MODELS.find(m => m.modelID === modelId) ?? MODELS[0];
    const make = MAKES.find(m => m.makeID === model.makeId)!;
    const categoryId = Number(form.get('categoryId'));
    const id = Math.max(...CARS.map(c => c.id)) + 1;
    const files = form.getAll('fotos').filter((f): f is File => f instanceof File);
    const extras: { Description: string }[] = JSON.parse((form.get('extrasList') as string) || '[]');

    const car: Car = {
      ...CARS[0],
      id,
      description: String(form.get('description') ?? ''),
      plate: String(form.get('plate') ?? ''),
      transmision: (form.get('transmission') as Transmisions) ?? Transmisions.Automatico,
      makeId: make.makeID,
      make,
      modelId: model.modelID,
      model: { modelID: model.modelID, description: model.description },
      year: Number(form.get('year')),
      color: String(form.get('color') ?? ''),
      engine: String(form.get('engine') ?? ''),
      fuel: String(form.get('fuel') ?? ''),
      kilometers: Number(form.get('kilometers')),
      direction: String(form.get('direction') ?? ''),
      extras: extras.map((e, i) => ({ id: i + 1, description: e.Description, carId: id })),
      photos: files.length
        ? files.map((file, i) => ({ photoID: i + 1, description: file.name, photoURL: URL.createObjectURL(file) }))
        : CARS[0].photos.slice(0, 1),
      contactId: Number(form.get('contactId')) || DEMO_USER_ID,
      categoryId,
      category: CATEGORIES.find(c => c.categoryID === categoryId) ?? CATEGORIES[0],
      price: Number(form.get('price')),
      isSale: form.get('isSale') === 'true',
      createdDate: new Date()
    };

    CARS.unshift(car);
    return car;
  }

  private login(userName?: string) {
    const name = userName?.trim() || 'demo';
    return {
      id: DEMO_USER_ID,
      message: null,
      token: this.fakeToken(name),
      userName: name,
      subscription: this.subscription(2)
    };
  }

  private subscription(typeSubscriptionId: number) {
    const typeSubscription = TYPE_SUBSCRIPTIONS.find(t => t.typeSubscryptionID === Number(typeSubscriptionId))
      ?? TYPE_SUBSCRIPTIONS[0];
    const activationDate = new Date();
    const terminationDate = new Date();
    terminationDate.setDate(activationDate.getDate() + typeSubscription.quantityDays);

    return {
      id: 1,
      typeSubscriptionId: typeSubscription.typeSubscryptionID,
      typeSubscription,
      userId: DEMO_USER_ID,
      user: { id: DEMO_USER_ID, username: 'demo', active: true },
      activationDate,
      terminationDate,
      active: true,
      messageError: null
    };
  }

  // Unsigned JWT with the claims AuthService reads (unique_name, nameid)
  private fakeToken(userName: string): string {
    const encode = (value: object) =>
      btoa(unescape(encodeURIComponent(JSON.stringify(value))))
        .replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

    return [
      encode({ alg: 'none', typ: 'JWT' }),
      encode({ unique_name: userName, nameid: DEMO_USER_ID }),
      'demo'
    ].join('.');
  }
}
