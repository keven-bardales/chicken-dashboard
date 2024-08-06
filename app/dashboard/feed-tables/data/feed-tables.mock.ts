import { breedsMock } from '../../breeds/data/breeds.mock';
import { FeedTable } from '../interfaces/feed-table.interface';
import { feedTableDetailMock } from './feed-table-details.mock';

export const feedTables: FeedTable[] = [
  {
    breedId: 1,
    created_at: new Date().toISOString(),
    description: 'Tabla alimenticia para pollos cobb 500',
    name: 'Tabla alimenticia Cobb 500 2023',
    deleted_at: null,
    id: 1,
    updated_at: new Date().toISOString(),
    image:
      'https://www.cobb-vantress.com/wp-content/uploads/2020/01/Cobb-500-1.png',
    breed: null,
    feedTableDetails: []
  }
];

feedTables.forEach((feedTable) => {
  const breed = breedsMock.find((breed) => breed.id === feedTable.breedId);

  const tableDetails = feedTableDetailMock.filter(
    (detail) => detail.feedTableId === feedTable.id
  );

  feedTable.feedTableDetails = tableDetails || [];

  feedTable.breed = breed || null;
});

export const feedTablesMock = feedTables;
