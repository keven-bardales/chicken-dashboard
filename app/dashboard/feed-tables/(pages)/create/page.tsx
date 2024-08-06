import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Tablas alimenticias', link: '/dashboard/feed-tables' },
  { title: 'Crear', link: '/dashboard/feed-tables/create' }
];
export default function Page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
    </PageContainer>
  );
}
