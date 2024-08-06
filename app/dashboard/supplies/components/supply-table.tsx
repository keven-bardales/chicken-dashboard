import React from 'react';
import { Supply } from '../interfaces/supply.interface';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { de } from 'date-fns/locale';
import currencyFormat from '@/lib/currency-format';

interface SupplyDetailTableProps {
  supplies: Supply[];
}

const SupplyTable: React.FC<SupplyDetailTableProps> = ({ supplies }) => {
  return (
    <div className="relative h-[70vh] max-h-[70vh] min-h-[70vh] w-full max-w-full overflow-auto">
      <div className="h-[70vh] max-h-[70vh] min-h-[70vh] w-full max-w-full overflow-auto">
        <Table className="w-full text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 z-[50] w-[150px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Nombre</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[200px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Descripción</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[150px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Precio Recomendado (Lempiras)</span>
                </span>
              </TableHead>
              <TableHead className="sticky top-0 z-[50] w-[150px]">
                <span className="flex w-full flex-col items-center gap-y-1 text-center">
                  <span>Tipo de Insumo</span>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplies.map((supply) => (
              <TableRow key={`${supply.id}-supply-detail`}>
                <TableCell>{supply.name}</TableCell>
                <TableCell>{supply.description}</TableCell>
                <TableCell>{currencyFormat(supply.recommendedPrice)}</TableCell>
                <TableCell>
                  {supply.supplyType ? supply.supplyType.name : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupplyTable;
