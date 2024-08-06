'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Escenarios de producción', link: '/dashboard/scenarios' }
];
export default function ScenariosPage() {
  //   const feedTables = useFeedTableStore((state) => state.getAllFeedTables());

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading
          title={`Escenarios de producción`}
          description="Escenarios de producción de distintas razas."
        />
        {/* <FeedTables data={feedTables} /> */}
      </div>
    </PageContainer>
  );
}
