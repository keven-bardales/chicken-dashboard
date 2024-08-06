import { SupplyType } from '../../supplies-types/interfaces/supply-type.interface';

export interface Supply {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  supplyTypeId: number;
  recommendedPrice: number;
  supplyType: SupplyType | null;
}
