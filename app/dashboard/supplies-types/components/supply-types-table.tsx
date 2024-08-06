import React from 'react';
import { SupplyType } from '../interfaces/supply-type.interface';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table';

interface SupplyTypeDetailTableProps {
  supplyTypes: SupplyType[];
}

const SupplyTypesTable: React.FC<SupplyTypeDetailTableProps> = ({
  supplyTypes
}) => {
  return (
    <div className="relative h-[70vh] max-h-[70vh] min-h-[70vh] w-full max-w-full overflow-auto">
      <div className="h-[70vh] max-h-[70vh] min-h-[70vh] w-full max-w-full overflow-auto">
        <Table className="w-full text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 z-[50] w-[100px]">
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
                  <span>Fecha de Creación</span>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplyTypes.map((supplyType) => (
              <TableRow key={`${supplyType.id}-supply-type-detail`}>
                <TableCell>{supplyType.name}</TableCell>
                <TableCell>{supplyType.description}</TableCell>
                <TableCell>
                  {new Date(supplyType.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupplyTypesTable;
