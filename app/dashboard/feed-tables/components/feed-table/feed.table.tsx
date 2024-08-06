'use client';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { FeedTable } from '../../interfaces/feed-table.interface';
import { feedTableColumns } from './columns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProductsClientProps {
  data: FeedTable[];
}

export const FeedTables: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Tablas alimenticias (${data.length})`}
          description="Tablas de alimentación de distintas razas."
        />
        <Link
          href={`/dashboard/feed-tables/create`}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Crear tabla
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={feedTableColumns} data={data} />
    </>
  );
};
