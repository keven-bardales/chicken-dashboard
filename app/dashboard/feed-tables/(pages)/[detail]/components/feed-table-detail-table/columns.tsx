import { ColumnDef } from '@tanstack/react-table';
import { BreedInterface } from '@/app/dashboard/breeds/interfaces/breed.interface';
import { useRouter } from 'next/router';
import { FeedTableDetail } from '@/app/dashboard/feed-tables/interfaces/feed-table-detail.interface';

export const feedTableDetailColumns: ColumnDef<FeedTableDetail>[] = [
  {
    accessorKey: 'age',
    header: 'Edad (días)'
  },
  {
    accessorKey: 'weight',
    header: 'Peso (lbs)'
  },
  {
    accessorKey: 'dailyWeightGain',
    header: 'Ganancia diaria (lbs)'
  },
  {
    accessorKey: 'dailyWeightGainRatio',
    header: 'Ganancia diaria promedio (lbs)',
    cell: (row) => {
      return row.row.original.dailyWeightGainRatio;
    }
  },
  {
    accessorKey: 'accumulatedFeedConversion',
    header: 'Conversión alimenticia acumulada (lbs)',
    cell: (row) => {
      return row.row.original.accumulatedFeedConversion;
    }
  },
  {
    accessorKey: 'dailyFeedIntake',
    header: 'Consumo diario de alimento (lbs)'
  },
  {
    accessorKey: 'accumulatedFeedIntake',
    header: 'Consumo de alimento acumulado (lbs)'
  }
];
