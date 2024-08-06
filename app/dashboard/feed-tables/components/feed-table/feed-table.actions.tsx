'use client';

import { useRouter } from 'next/navigation';
import { FeedTable } from '../../interfaces/feed-table.interface';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FeedTableActionsProps {
  feedTable: FeedTable;
}

export default function FeedTableActions({ feedTable }: FeedTableActionsProps) {
  return (
    <div className="flex space-x-2">
      <Link
        className={cn(buttonVariants({}))}
        href={`/dashboard/feed-tables/${feedTable.id}`}
      >
        Ver
      </Link>
    </div>
  );
}
