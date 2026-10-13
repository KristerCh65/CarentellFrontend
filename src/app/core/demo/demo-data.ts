import { Car } from 'src/app/cars/models/car';
import { Category } from 'src/app/cars/models/category';
import { Make } from 'src/app/cars/models/make';
import { Model } from 'src/app/cars/models/model';
import { Photo } from 'src/app/cars/models/photo';
import { Transmisions } from 'src/app/cars/models/transmisions.enum';
import { Township } from 'src/app/profile/models/address';
import { Contact } from 'src/app/profile/models/contact';
import { Department } from 'src/app/profile/models/department';
import { TypeSubscription } from 'src/app/subscriptions/models/type-subscription';

// Sample data used when environment.demo is true, so the app can be
// published without the backend API.

export const DEMO_USER_ID = 1;

export const CATEGORIES: Category[] = [
  { categoryID: 1, description: 'Pick Up' },
  { categoryID: 2, description: 'Sedan' },
  { categoryID: 3, description: 'SUV' }
];

export const MAKES: Make[] = [
  { makeID: 1, description: 'Toyota' },
  { makeID: 2, description: 'Mitsubishi' },
  { makeID: 3, description: 'Honda' },
  { makeID: 4, description: 'Chevrolet' },
  { makeID: 5, description: 'Jeep' },
  { makeID: 6, description: 'Nissan' },
  { makeID: 7, description: 'Hyundai' }
];

export const MODELS: (Model & { makeId: number })[] = [
  { modelID: 1, makeId: 1, description: 'Tacoma' },
  { modelID: 2, makeId: 1, description: 'Corolla' },
  { modelID: 3, makeId: 1, description: 'Hilux' },
  { modelID: 4, makeId: 2, description: 'L200' },
  { modelID: 5, makeId: 2, description: 'Montero' },
  { modelID: 6, makeId: 3, description: 'Civic' },
  { modelID: 7, makeId: 3, description: 'CR-V' },
  { modelID: 8, makeId: 4, description: 'Camaro' },
  { modelID: 9, makeId: 5, description: 'Cherokee' },
  { modelID: 10, makeId: 5, description: 'Compass' },
  { modelID: 11, makeId: 6, description: 'Frontier' },
  { modelID: 12, makeId: 7, description: 'Tucson' }
];

export const DEPARTMENTS: Department[] = [
  { departmentID: 1, name: 'Atlántida' },
  { departmentID: 5, name: 'Cortés' },
  { departmentID: 8, name: 'Francisco Morazán' }
];

export const TOWNSHIPS: Township[] = [
  { townshipId: 1, townCode: 101, name: 'La Ceiba', departmentId: 1 },
  { townshipId: 2, townCode: 107, name: 'Tela', departmentId: 1 },
  { townshipId: 3, townCode: 501, name: 'San Pedro Sula', departmentId: 5 },
  { townshipId: 4, townCode: 502, name: 'Choloma', departmentId: 5 },
  { townshipId: 5, townCode: 506, name: 'Puerto Cortés', departmentId: 5 },
  { townshipId: 6, townCode: 509, name: 'Villanueva', departmentId: 5 },
  { townshipId: 7, townCode: 801, name: 'Distrito Central', departmentId: 8 }
];

function buildContact(
  contactID: number, userId: number, name: string, lastName: string,
  phone: string, correo: string, departmentId: number, townshipId: number, neighborhood: string
): Contact {
  const department = DEPARTMENTS.find(d => d.departmentID === departmentId)!;
  const township = TOWNSHIPS.find(t => t.townshipId === townshipId)!;
  return {
    contactID,
    userId,
    birthDate: new Date(1995, 0, 1),
    correo,
    dni: '0501-1995-0000' + contactID,
    name,
    lastName,
    phone,
    photoURL: '',
    // departmentID is the field name the profile form binds to
    address: {
      addressID: contactID,
      departmentId,
      departmentID: departmentId,
      department: { id: department.departmentID, name: department.name },
      townshipId,
      township,
      neighborhood,
      references: 'Frente al parque central'
    } as Contact['address'],
    messageError: null as any,
    socialMedia: []
  };
}

export const CONTACTS: Contact[] = [
  buildContact(1, DEMO_USER_ID, 'Usuario', 'Demo', '+504 9999-0001', 'demo@carentell.hn', 5, 3, 'Col. Trejo'),
  buildContact(2, 2, 'Carlos', 'Mejía', '+504 9999-0002', 'carlos@carentell.hn', 5, 4, 'Col. López Arellano'),
  buildContact(3, 3, 'Daniela', 'Castro', '+504 9999-0003', 'daniela@carentell.hn', 8, 7, 'Col. Palmira')
];

function photos(...files: string[]): Photo[] {
  return files.map((file, i) => ({
    photoID: i + 1,
    description: file,
    photoURL: encodeURI('assets/cars-images/' + file)
  }));
}

interface CarSeed {
  id: number;
  modelId: number;
  categoryId: number;
  year: number;
  color: string;
  transmision: Transmisions;
  engine: string;
  fuel: string;
  kilometers: number;
  direction: string;
  price: number;
  isSale: boolean;
  contactId: number;
  createdDate: string;
  description: string;
  extras: string[];
  photos: Photo[];
}

function buildCar(seed: CarSeed): Car {
  const model = MODELS.find(m => m.modelID === seed.modelId)!;
  const make = MAKES.find(m => m.makeID === model.makeId)!;
  const contact = CONTACTS.find(c => c.contactID === seed.contactId)!;
  return {
    ...seed,
    plate: 'HAF' + (7000 + seed.id),
    makeId: make.makeID,
    make,
    model: { modelID: model.modelID, description: model.description },
    priorityId: 1,
    extras: seed.extras.map((description, i) => ({ id: i + 1, description, carId: seed.id })),
    category: CATEGORIES.find(c => c.categoryID === seed.categoryId)!,
    status: 1,
    discount: 0,
    fotos: undefined as any,
    createdDate: new Date(seed.createdDate),
    locationId: contact.address.addressID,
    location: {
      id: contact.address.addressID,
      townshipId: contact.address.townshipId,
      departmentId: contact.address.departmentId,
      address: contact.address.references,
      neighborhood: contact.address.neighborhood
    },
    errorMessage: null as any
  };
}

export const CARS: Car[] = [
  buildCar({
    id: 1, modelId: 1, categoryId: 1, year: 2021, color: 'Rojo', transmision: Transmisions.Automatico,
    engine: '3.5L V6', fuel: 'Gasolina', kilometers: 32000, direction: 'Hidráulica',
    price: 985000, isSale: true, contactId: 2, createdDate: '2022-10-05',
    description: 'Toyota Tacoma doble cabina en excelente estado, único dueño y mantenimientos en agencia.',
    extras: ['Cámara de retroceso', 'Pantalla táctil', 'Bluetooth', 'Rines de aluminio'],
    photos: photos(
      '33-370-2021_toyota_tacoma-pic-895250176617459698-1024x768.jpeg',
      '33-758-2021_toyota_tacoma-pic-912888336462055858-1024x768.jpeg',
      '33-759-2021_toyota_tacoma-pic-2872478425702011220-1024x768.jpeg',
      '33-760-2021_toyota_tacoma-pic-2977839985576814192-1024x768.jpeg',
      '33-760-2021_toyota_tacoma-pic-6913432782151465176-1024x768.jpeg'
    )
  }),
  buildCar({
    id: 2, modelId: 4, categoryId: 1, year: 2018, color: 'Gris', transmision: Transmisions.Mecanico,
    engine: '2.4L Turbo Diésel', fuel: 'Diesel', kilometers: 78500, direction: 'Hidráulica',
    price: 1600, isSale: false, contactId: 3, createdDate: '2022-10-02',
    description: 'Mitsubishi L200 4x4 ideal para trabajo y viajes fuera de la ciudad.',
    extras: ['Tracción 4x4', 'Aire acondicionado', 'Barra antivuelco'],
    photos: photos(
      '35-692-frontal mitsubishi.jpg',
      '35-699-lateral mitsubishi.jpg',
      '35-649-frente mitsubishi.jpg',
      '35-698-interior mitsubishi.jpg',
      '35-702-motor mitsubishi.jpg'
    )
  }),
  buildCar({
    id: 3, modelId: 2, categoryId: 2, year: 2015, color: 'Plateado', transmision: Transmisions.Automatico,
    engine: '1.8L', fuel: 'Gasolina', kilometers: 96000, direction: 'Eléctrica',
    price: 285000, isSale: true, contactId: 1, createdDate: '2022-09-28',
    description: 'Toyota Corolla económico y confiable, perfecto para la ciudad.',
    extras: ['Pantalla táctil', 'Control de crucero', 'Rines de aluminio'],
    photos: photos(
      '34-726-Toyota-Corolla-2015-frente-lateral.jpg',
      '34-706-Toyota-Corolla-2015-atrás-lateral.jpg',
      '34-728-Toyota-Corolla-2015-frente-lateral-detalle-500x333.jpg',
      '34-729-Toyota-Corolla-2015-palanca-500x333.jpg',
      '34-730-Toyota-Corolla-2015-pantalla-500x333.jpg',
      '34-730-Toyota-Corolla-2015-rin-500x333.jpg'
    )
  }),
  buildCar({
    id: 4, modelId: 6, categoryId: 2, year: 2014, color: 'Gris', transmision: Transmisions.Automatico,
    engine: '1.8L', fuel: 'Gasolina', kilometers: 88000, direction: 'Eléctrica',
    price: 265000, isSale: true, contactId: 2, createdDate: '2022-09-25',
    description: 'Honda Civic con interiores impecables y motor en perfectas condiciones.',
    extras: ['Bluetooth', 'Volante multifunción', 'Vidrios eléctricos'],
    photos: photos(
      '1035-541-1643932574803668329_large.jpg',
      '1035-564-1643932571570402759_large.jpg',
      '1035-575-1643932575307187733_large.jpg',
      '1035-581-16439325721050507477_large.jpg',
      '1035-557-1643932569802844161_large.jpg'
    )
  }),
  buildCar({
    id: 5, modelId: 6, categoryId: 2, year: 2010, color: 'Plateado', transmision: Transmisions.Mecanico,
    engine: '1.8L', fuel: 'Gasolina', kilometers: 142000, direction: 'Hidráulica',
    price: 900, isSale: false, contactId: 3, createdDate: '2022-09-20',
    description: 'Honda Civic para alquiler diario, bajo consumo de combustible.',
    extras: ['Aire acondicionado', 'Radio con USB'],
    photos: photos(
      '30-535-c600f72a-af0a-4236-9ab8-01e1d14f5ad3.jpeg',
      '30-529-6425c71c-e197-4587-b9e4-5f4cb3604496.jpeg',
      '30-537-honda-civic-2013942692_large.jpeg'
    )
  }),
  buildCar({
    id: 6, modelId: 8, categoryId: 2, year: 2011, color: 'Amarillo', transmision: Transmisions.Automatico,
    engine: '3.6L V6', fuel: 'Gasolina', kilometers: 67000, direction: 'Electrohidráulica',
    price: 420000, isSale: true, contactId: 1, createdDate: '2022-09-18',
    description: 'Chevrolet Camaro deportivo, pintura original y siempre en garaje.',
    extras: ['Asientos de cuero', 'Sistema de sonido premium', 'Rines deportivos'],
    photos: photos('32-483-chevrolet-camaro-amarillo-55112629.jpg')
  }),
  buildCar({
    id: 7, modelId: 9, categoryId: 3, year: 2015, color: 'Rojo', transmision: Transmisions.Automatico,
    engine: '2.4L', fuel: 'Gasolina', kilometers: 81000, direction: 'Eléctrica',
    price: 1400, isSale: false, contactId: 2, createdDate: '2022-09-15',
    description: 'Jeep Cherokee espaciosa y cómoda, ideal para viajes en familia.',
    extras: ['Tracción 4x4', 'Cámara de retroceso', 'Pantalla táctil'],
    photos: photos(
      '31-392-1571870711996316496_large.jpeg',
      '31-385-1571870710644474955_large.jpeg',
      '31-394-15718707151826768656_large.jpeg'
    )
  }),
  buildCar({
    id: 8, modelId: 10, categoryId: 3, year: 2012, color: 'Negro', transmision: Transmisions.Automatico,
    engine: '2.4L', fuel: 'Gasolina', kilometers: 120000, direction: 'Hidráulica',
    price: 215000, isSale: true, contactId: 1, createdDate: '2022-09-10',
    description: 'Jeep Compass en buen estado general, lista para traspaso.',
    extras: ['Aire acondicionado', 'Vidrios eléctricos', 'Rines de aluminio'],
    photos: photos(
      '23-639-56392e09-a-590c.jpg',
      '23-655-download.jpeg',
      '23-659-JeepCompass2012-25112011-05.jpg'
    )
  })
];

export const TYPE_SUBSCRIPTIONS: TypeSubscription[] = [
  {
    typeSubscryptionID: 1, description: 'Básico', quantityDays: 30, priority: 1, price: 10,
    comentaries: '1 vehículo publicado,Hasta 5 fotos por vehículo,Soporte por correo'
  },
  {
    typeSubscryptionID: 2, description: 'Estándar', quantityDays: 30, priority: 2, price: 25,
    comentaries: '5 vehículos publicados,Fotos ilimitadas,Prioridad en búsquedas,Soporte por correo'
  },
  {
    typeSubscryptionID: 3, description: 'Premium', quantityDays: 30, priority: 3, price: 50,
    comentaries: 'Vehículos ilimitados,Fotos ilimitadas,Máxima prioridad en búsquedas,Soporte 24/7'
  }
];
