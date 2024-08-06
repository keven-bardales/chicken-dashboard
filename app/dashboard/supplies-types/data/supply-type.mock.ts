// src/data/supply-types.mock.ts
import { SupplyType } from '../interfaces/supply-type.interface';

export const supplyTypesMock: SupplyType[] = [
  {
    id: 1,
    name: 'Alimento balanceado',
    description: 'Alimento balanceado para pollos de engorde.',
    image: 'https://example.com/alimento-balanceado.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null
  },
  {
    id: 2,
    name: 'Vacunas',
    description: 'Vacunas necesarias para pollos de engorde.',
    image: 'https://example.com/vacunas.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null
  },
  {
    id: 3,
    name: 'Equipos de alimentación',
    description:
      'Equipos utilizados para la alimentación de pollos de engorde.',
    image: 'https://example.com/equipos-alimentacion.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null
  }
];
