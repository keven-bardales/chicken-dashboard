'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import ScenarioCreate from './components/scenario.create';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Escenarios de producción', link: '/dashboard/scenarios' }
];
export default function ScenariosPage() {
  //   const feedTables = useFeedTableStore((state) => state.getAllFeedTables());

  return (
    <PageContainer>
      <div className="flex flex-col gap-y-6">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading
          title={`Crear escenario de producción`}
          description="Escenarios de producción de distintas razas."
        />
        <ScenarioCreate />
      </div>
    </PageContainer>
  );
}
