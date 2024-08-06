'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import SupplyTypesTable from './components/supply-types-table';
import { useSupplyTypeStore } from './stores/supplies-type.store';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Tipos de insumos', link: '/dashboard/supplies-types' }
];
export default function ScenariosPage() {
  const supplyTypes = useSupplyTypeStore((state) => state.getAllSupplyTypes());

  return (
    <PageContainer>
      <div className="flex flex-col gap-y-6">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading
          title={`Tipos de insumos`}
          description="Distintos tipos de insumos que pueden ser usados."
        />
        <SupplyTypesTable supplyTypes={supplyTypes} />
      </div>
    </PageContainer>
  );
}
