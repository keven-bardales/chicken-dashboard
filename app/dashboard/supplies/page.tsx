'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import SupplyTable from './components/supply-table';
import { useSupplyStore } from './stores/supply-store';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Insumos', link: '/dashboard/supplies' }
];
export default function ScenariosPage() {
  const supplies = useSupplyStore((state) => state.getAllSupplies());

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title={`Insumos`} description="Listado completo de insumos." />
        <SupplyTable supplies={supplies} />
      </div>
    </PageContainer>
  );
}
