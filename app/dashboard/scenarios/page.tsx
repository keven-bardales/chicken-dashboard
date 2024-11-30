'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

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
        <div className="flex items-start justify-between">
          <Heading
            title={`Escenarios de producción`}
            description="Escenarios de producción de distintas razas."
          />
          <Link
            href={`/dashboard/scenarios/create`}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Crear escenario
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
