'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { FeedTables } from './components/feed-table/feed.table';
import { useFeedTableStore } from './stores/feed-table.store';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Tablas alimenticias', link: '/dashboard/feed-tables' }
];
export default function Page() {
  const feedTables = useFeedTableStore((state) => state.getAllFeedTables());

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <FeedTables data={feedTables} />
      </div>
    </PageContainer>
  );
}
