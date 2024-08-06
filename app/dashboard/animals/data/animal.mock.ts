import { Animal } from '../interfaces/animal.interface';

export const animals: Animal[] = [
  {
    id: 1,
    name: 'Pollos',
    created_at: new Date().toISOString(),
    deleted_at: null,
    description: 'Pollos de granja',
    image:
      'https://aviagen.com/assets/Product_Hero/2024/ProductHeroBird_800x700_Ross308__ScaleMaxWidthWzgwMF0.png',
    updated_at: new Date().toISOString()
  }
];
