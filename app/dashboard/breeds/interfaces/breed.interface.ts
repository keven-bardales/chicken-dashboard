import { Animal } from '../../animals/interfaces/animal.interface';

export interface BreedInterface {
  id: number;
  name: string;
  description: string;
  animalId: number;
  animal: Animal | null;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
