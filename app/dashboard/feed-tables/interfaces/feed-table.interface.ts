import { BreedInterface } from '../../breeds/interfaces/breed.interface';
import { FeedTableDetail } from './feed-table-detail.interface';

export interface FeedTable {
  id: number;
  name: string;
  description: string;
  image: string;
  breedId: number;
  breed: BreedInterface | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  feedTableDetails: FeedTableDetail[];
}
