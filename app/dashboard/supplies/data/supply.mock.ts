import { supplyTypesMock } from '../../supplies-types/data/supply-type.mock';
import { Supply } from '../interfaces/supply.interface';

export const supplies: Supply[] = [
  {
    id: 1,
    name: 'Concentrado Inicio Integral',
    description: 'Concentrado para el inicio del crecimiento.',
    image: 'https://example.com/images/concentrado-inicio.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    supplyTypeId: 1,
    recommendedPrice: 760,
    supplyType: null
  },
  {
    id: 2,
    name: 'Concentrado Final Integral',
    description: 'Concentrado para la etapa final del crecimiento.',
    image: 'https://example.com/images/concentrado-final.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    supplyTypeId: 1,
    recommendedPrice: 750,
    supplyType: null
  }
  // Puedes agregar más objetos Supply aquí
];

supplies.forEach((supply) => {
  const supplyType = supplyTypesMock.find(
    (type) => type.id === supply.supplyTypeId
  );
  supply.supplyType = supplyType || null;
});

export const suppliesMock = supplies;
