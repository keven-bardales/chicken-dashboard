import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Supply } from '../interfaces/supply.interface';
import { suppliesMock } from '../data/supply.mock';

type SupplyStore = {
  supplies: Supply[];
  addSupply: (supply: Omit<Supply, 'id'>) => void;
  removeSupply: (supply: Supply) => void;
  getAllSupplies: () => Supply[];
  getSupplyById: (id: number) => Supply | undefined;
};

export const useSupplyStore = create<SupplyStore>()(
  persist(
    (set, get) => ({
      getAllSupplies() {
        const currentSupplies = get().supplies;

        if (currentSupplies?.length > 0) {
          return currentSupplies;
        }

        const mocks = suppliesMock;

        set({
          supplies: mocks
        });

        return mocks;
      },
      addSupply: (supply: Omit<Supply, 'id'>) => {
        let supplies = get().supplies;
        const newSupply = {
          ...supply,
          id: supplies.length + 1
        };

        supplies = supplies.filter((supply) => supply.id !== newSupply.id);

        set({
          supplies: [...supplies, newSupply]
        });
      },
      removeSupply: (supply: Supply) => {
        const supplies = get().supplies.filter(
          (currentSupply) => currentSupply.id !== supply.id
        );

        set({
          supplies
        });
      },
      getSupplyById: (id: number) => {
        const supplies = get().supplies;
        return supplies.find((supply) => supply.id === id);
      },

      supplies: []
    }),
    {
      name: 'supplies-store'
    }
  )
);
