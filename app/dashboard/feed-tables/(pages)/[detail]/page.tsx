'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import FeedTableDetail from './components/feed-table-detail-table/feed-table-detail-table';
import { useFeedTableStore } from '../../stores/feed-table.store';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/heading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Tablas alimenticias', link: '/dashboard/feed-tables' }
];

interface FeedTableDetailPageProps {
  params: {
    detail: string;
  };
}

export default function Page({ params }: FeedTableDetailPageProps) {
  if (!params.detail) {
    notFound();
  }

  const isANumber = !isNaN(Number(params.detail));

  if (!isANumber) {
    notFound();
  }

  const feedTable = useFeedTableStore((state) =>
    state.getTableById(Number(params.detail))
  );

  if (!feedTable) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <Heading
          title={`${feedTable?.name}`}
          description={feedTable?.description}
        />

        <FeedTableDetail feedTable={feedTable} />
      </div>
    </PageContainer>
  );
}
