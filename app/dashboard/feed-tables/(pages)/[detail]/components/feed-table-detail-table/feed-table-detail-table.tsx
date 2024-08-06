'use client';

import { FeedTable } from '@/app/dashboard/feed-tables/interfaces/feed-table.interface';
import { DataTable } from '@/components/ui/data-table';
import { feedTableDetailColumns } from './columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface FeedTableDetailTableProps {
  feedTable: FeedTable;
}

export default function FeedTableDetail({
  feedTable
}: FeedTableDetailTableProps) {
  return (
    <div className="relative h-[70vh] max-h-[70vh] min-h-[70vh] w-full max-w-full overflow-auto">
      <div className="h-[70vh] max-h-[70vh] min-h-[70vh] w-full max-w-full overflow-auto">
        <Table className="w-full text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Edad</span>
                  <span>(dias)</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Peso</span>
                  <span>(lbs)</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Ganancia diaria</span>
                  <span>(lbs)</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Ganancia diaria promedio</span>
                  <span>(lbs)</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Conversión alimenticia acumulada</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Consumo diario de alimento</span>
                  <span>(lbs)</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Consumo de alimento acumulado</span>
                  <span>(lbs)</span>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedTable?.feedTableDetails.map((feedTableDetail) => (
              <TableRow key={`${feedTableDetail?.id}-feed-table-detail`}>
                <TableCell>{feedTableDetail.age}</TableCell>
                <TableCell>{feedTableDetail.weight}</TableCell>
                <TableCell>{feedTableDetail.dailyWeightGain}</TableCell>
                <TableCell>{feedTableDetail.dailyWeightGainRatio}</TableCell>
                <TableCell>
                  {feedTableDetail.accumulatedFeedConversion}
                </TableCell>
                <TableCell>{feedTableDetail.dailyFeedIntake}</TableCell>
                <TableCell>{feedTableDetail.accumulatedFeedIntake}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
