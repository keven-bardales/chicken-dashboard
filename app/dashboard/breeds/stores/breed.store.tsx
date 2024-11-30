import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BreedInterface } from '../interfaces/breed.interface';
import { breedsMock } from '../data/breeds.mock';

type BreedStore = {
  breeds: BreedInterface[];
  addBreed: (breed: Omit<BreedInterface, 'id'>) => void;
  removeBreed: (breed: BreedInterface) => void;
  getAllBreeds: () => BreedInterface[];
  getBreedById: (id: number) => BreedInterface | undefined;
};

export const useBreedStore = create<BreedStore>()(
  persist(
    (set, get) => ({
      getAllBreeds() {
        const currentBreeds = get().breeds;

        if (currentBreeds?.length > 0) {
          return currentBreeds;
        }

        const mocks = breedsMock;

        set({
          breeds: mocks
        });

        return mocks;
      },
      addBreed: (breed: Omit<BreedInterface, 'id'>) => {
        let breeds = get().breeds;
        const newBreed = {
          ...breed,
          id: breeds.length + 1
        };

        breeds = breeds.filter(
          (existingBreed) => existingBreed.id !== newBreed.id
        );

        set({
          breeds: [...breeds, newBreed]
        });
      },
      removeBreed: (breed: BreedInterface) => {
        const breeds = get().breeds.filter(
          (existingBreed) => existingBreed.id !== breed.id
        );

        set({
          breeds
        });
      },
      getBreedById: (id: number) => {
        const breeds = get().breeds;
        return breeds.find((breed) => breed.id === id);
      },

      breeds: []
    }),
    {
      name: 'breeds-store'
    }
  )
);
