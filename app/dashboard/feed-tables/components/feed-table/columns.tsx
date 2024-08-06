import { ColumnDef } from '@tanstack/react-table';
import { FeedTable } from '../../interfaces/feed-table.interface';
import { BreedInterface } from '@/app/dashboard/breeds/interfaces/breed.interface';
import { useRouter } from 'next/router';
import FeedTableActions from './feed-table.actions';

export const feedTableColumns: ColumnDef<FeedTable>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
  {
    accessorKey: 'breed',
    header: 'Raza',
    cell: (row) => {
      const breed: BreedInterface = row.getValue() as BreedInterface;
      return breed?.name;
    }
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell({ row }) {
      const feedTable = row.original;
      return <FeedTableActions feedTable={feedTable} />;
    }
  }
];
