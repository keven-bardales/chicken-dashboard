'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { KpiRecordsPassed } from './page';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import es from 'date-fns/locale/es';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export default function ClientDataDashboard({
  kpiData
}: {
  kpiData: KpiRecordsPassed;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 9, 4),
    to: new Date()
  });

  const [selectedChickenGroup, setSelectedChickenGroup] = React.useState<
    string | undefined
  >('Todos');

  const originalChickenGroups = kpiData.chickenGroupsSheet.sheetRows.map(
    (row) => row.chickenGroup
  );

  const originalKpiData = { ...kpiData };

  const allSelected = selectedChickenGroup === 'Todos';

  const filteredProductionData =
    originalKpiData.productionSheet.sheetRows.filter((row) => {
      const chickenGroupValueIsInList = originalChickenGroups.includes(
        row.chickenGroup
      );

      if (
        (row.chickenGroup !== selectedChickenGroup && !allSelected) ||
        !chickenGroupValueIsInList
      ) {
        return false;
      }

      if (date?.from && date?.to) {
        if (new Date(row.date) < date.from || new Date(row.date) > date.to) {
          return false;
        }
      }

      return true;
    });

  const filteredSuppliesConsumedData =
    originalKpiData.suppliesConsumedSheet.sheetRows.filter((row) => {
      const chickenGroupValueIsInList = originalChickenGroups.includes(
        row.chickenGroup
      );

      if (
        (row.chickenGroup !== selectedChickenGroup && !allSelected) ||
        !chickenGroupValueIsInList
      ) {
        return false;
      }

      if (date?.from && date?.to) {
        if (new Date(row.date) < date.from || new Date(row.date) > date.to) {
          return false;
        }
      }

      return true;
    });

  const filteredOutputsByWarehouseData =
    originalKpiData.outputsByWarehouseSheet.sheetRows.filter((row) => {
      const chickenGroupValueIsInList = originalChickenGroups.includes(
        row.originChickenGroup
      );

      if (
        (row.originChickenGroup !== selectedChickenGroup && !allSelected) ||
        !chickenGroupValueIsInList
      ) {
        return false;
      }

      if (date?.from && date?.to) {
        if (new Date(row.date) < date.from || new Date(row.date) > date.to) {
          return false;
        }
      }

      return true;
    });

  const filteredCostRecordsData =
    originalKpiData.costsRecordSheet.sheetRows.filter((row) => {
      const chickenGroupValueIsInList = originalChickenGroups.includes(
        row.chickenGroup
      );

      if (
        (row.chickenGroup !== selectedChickenGroup && !allSelected) ||
        !chickenGroupValueIsInList
      ) {
        return false;
      }

      if (date?.from && date?.to) {
        if (new Date(row.date) < date.from || new Date(row.date) > date.to) {
          return false;
        }
      }

      return true;
    });

  const filteredWarehouseEntriesData =
    originalKpiData.warehouseEntriesSheet.sheetRows.filter((row) => {
      const chickenGroupValueIsInList = originalChickenGroups.includes(
        row.originChickenGroup
      );

      if (
        (row.originChickenGroup !== selectedChickenGroup && !allSelected) ||
        !chickenGroupValueIsInList
      ) {
        return false;
      }

      if (date?.from && date?.to) {
        if (new Date(row.date) < date.from || new Date(row.date) > date.to) {
          return false;
        }
      }

      return true;
    });

  const filteredSalesData = originalKpiData.salesRecordSheet.sheetRows.filter(
    (row) => {
      const chickenGroupValueIsInList = originalChickenGroups.includes(
        row.chickenGroup
      );

      if (
        (row.chickenGroup !== selectedChickenGroup && !allSelected) ||
        !chickenGroupValueIsInList
      ) {
        return false;
      }

      if (date?.from && date?.to) {
        if (new Date(row.date) < date.from || new Date(row.date) > date.to) {
          return false;
        }
      }

      return true;
    }
  );

  console.log({
    filteredProductionData
  });

  const chartConfig = {
    realEggs: {
      label: 'Producido',
      color: 'hsl(var(--chart-1))'
    },
    projectedEggs: {
      label: 'Proyectado',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex items-center justify-end gap-x-4">
        <div className={cn('grid gap-2')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[260px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y', {
                        locale: es
                      })}{' '}
                      -{' '}
                      {format(date.to, 'LLL dd, y', {
                        locale: es
                      })}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y', {
                      locale: es
                    })
                  )
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Select
          value={selectedChickenGroup}
          onValueChange={(v) => {
            setSelectedChickenGroup(v);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un lote" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lotes</SelectLabel>
              {originalChickenGroups.map((chickenGroup, i) => {
                return (
                  <SelectItem key={`${chickenGroup}-${i}`} value={chickenGroup}>
                    {chickenGroup}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <section className="grid w-full grid-cols-4">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Producción</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer className="h-[50vh] w-full" config={chartConfig}>
              <BarChart accessibilityLayer data={filteredProductionData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="dateFormatted"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="realEggs" fill="hsl(var(--chart-1))" radius={4} />
                <Bar
                  dataKey="projectedEggs"
                  fill="hsl(var(--chart-2))"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
