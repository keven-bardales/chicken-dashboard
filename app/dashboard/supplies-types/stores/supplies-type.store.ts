// src/store/supply-type.store.ts
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { SupplyType } from '../interfaces/supply-type.interface';
import { supplyTypesMock } from '../data/supply-type.mock';

type SupplyTypeStore = {
  supplyTypes: SupplyType[];
  addSupplyType: (supplyType: SupplyType) => void;
  removeSupplyType: (supplyType: SupplyType) => void;
  getAllSupplyTypes: () => SupplyType[];
  getSupplyTypeById: (id: number) => SupplyType | undefined;
};

export const useSupplyTypeStore = create<SupplyTypeStore>()(
  persist(
    (set, get) => ({
      getAllSupplyTypes() {
        const currentSupplyTypes = get().supplyTypes;

        if (currentSupplyTypes?.length > 0) {
          return currentSupplyTypes;
        }

        const mocks = supplyTypesMock;

        set({
          supplyTypes: mocks
        });

        return mocks;
      },
      addSupplyType: (supplyType: Omit<SupplyType, 'id'>) => {
        let supplyTypes = get().supplyTypes;
        const newSupplyType = {
          ...supplyType,
          id: supplyTypes.length + 1
        };

        supplyTypes = supplyTypes.filter(
          (supplyType) => supplyType.id !== newSupplyType.id
        );

        set({
          supplyTypes: [...supplyTypes, newSupplyType]
        });
      },
      removeSupplyType: (supplyType: SupplyType) => {
        const supplyTypes = get().supplyTypes.filter(
          (currentSupplyType) => currentSupplyType.id !== supplyType.id
        );

        set({
          supplyTypes
        });
      },
      getSupplyTypeById: (id: number) => {
        const supplyTypes = get().supplyTypes;
        return supplyTypes.find((supplyType) => supplyType.id === id);
      },

      supplyTypes: []
    }),
    {
      name: 'supply-types-store'
    }
  )
);
