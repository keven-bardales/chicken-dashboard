import { animals } from '../../animals/data/animal.mock';
import { BreedInterface } from '../interfaces/breed.interface';

export const breeds: BreedInterface[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    description: 'Pollos de la raza Cobb 500',
    image:
      'https://www.cobb-vantress.com/wp-content/uploads/2020/01/Cobb-500-1.png',
    name: 'Cobb 500',
    updated_at: new Date().toISOString(),
    deleted_at: '',
    animalId: 1,
    animal: null
  }
];

breeds.forEach((breed) => {
  const animal = animals.find((animal) => animal.id === breed.animalId);
  breed.animal = animal || null;
});

export const breedsMock = breeds;
