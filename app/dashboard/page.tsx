import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Auth, google } from 'googleapis';
import { object } from 'zod';
import UseClientTest from './use-client-test';
import ClientDataDashboard from './use-client-test';

const GOOGLE_SERVICE_ACCOUNT = {
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    projectId: process.env.GOOGLE_PROJECT_ID,
    token_url: process.env.GOOGLE_TOKEN_URL,
    type: process.env.GOOGLE_TYPE
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
};

interface SheetItem<T> {
  sheetId: number | string;
  sheetName: string | number;
  sheetRows: T[];
}

interface BaseProductionDiary {
  date: string;
  dateFormatted: string;
  quantityOfChickenOfDay: number;
  projectedEggs: number;
  realEggs: number;
  projectedEggBox: number;
  realEggBox: number;
  complianceOfDay: number;
  projectedCumulativeEggs: number;
  realCumulativeEggs: number;
  projectedFoodPounds: number;
  realFoodPounds: number;
  projectedCumulativeFoodPounds: number;
  realCumulativeFoodPounds: number;
  ageChickenGroupDays: number;
  ageChickenGroupWeeks: number;
  chickenGroup: string;
  deadChickensDay: number;
  originalQuantityOfChickens: number;
  deadChickensCumulative: number;
  lostChickens: number;
  cumulativeLostChickens: number;
}

interface SuppliesConsumed {
  date: string;
  dateFormatted: string;
  product: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  type: string;
  chickenGroup: string;
}

interface OutputsByWarehouse {
  warehouse: string;
  product: string;
  quantity: number;
  date: string;
  dateFormatted: string;
  eggQuantity: number;
  originChickenGroup: string;
  description: string;
}

interface CostsRecord {
  date: string;
  dateFormatted: string;
  product: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  type: string;
  chickenGroup: string;
}

interface WarehouseEntries {
  warehouse: string;
  product: string;
  quantity: number;
  date: string;
  dateFormatted: string;
  eggQuantity: number;
  originChickenGroup: string;
  description: string;
}

interface SalesRecord {
  date: string;
  dateFormatted: string;
  product: string;
  quantity: number;
  eggQuantity: number;
  unitPrice: number;
  customer: string;
  paid: number;
  saleStatus: string;
  saleReason: string;
  saleLossReason: string;
  customerComments: string;
  chickenGroup: string;
  salesMan: string;
  internalComments: string;
  productCategory: string;
  totalSale: number;
  totalPending: number;
}

interface ChickenGroups {
  chickenGroup: string;
}

interface ProductionVsProjectionKpiItem {
  date: string;
  dateFormatted: string;
  production: number;
  projection: number;
}
interface ProductionVsProjectionKpi {
  totalProduction: number;
  totalProductionInBoxes: number;
  quantityOfChickensAverage: number;
  productionProjectionAverage: number;
  totalProjection: number;
  items: ProductionVsProjectionKpiItem[];
}

interface MoneyFlowKpiItem {
  flowName: string;
  totalMoney: number;
}

interface MoneyFlowKpi {
  totalMoneyFlow: number;
  totalMoneyAvailable: number;
  totalMoneyAvailableBasedOnFlow: number;
  items: MoneyFlowKpiItem[];
}

interface CostControlKpi {
  totalCost: number;
  costPerEgg: number;
  productionCost: number;
}

interface StockKpi {
  eggsInStock: number;
  compromisedEggs: number;
  eggsToOffer: number;
  moneyInStock: number;
  eggBoxesInStock: number;
  compromisedEggBoxes: number;
  eggBoxesToOffer: number;
}

interface SalesKpi {
  eggsSold: number;
  eggBoxesSold: number;
  totalSales: number;
}

interface KpiByGroup {
  chickenGroup: string;
  productionVsProjection: ProductionVsProjectionKpi;
  moneyFlow: MoneyFlowKpi;
  costControl: CostControlKpi;
  stock: StockKpi;
  sales: SalesKpi;
}

export interface KpiRecordsPassed {
  productionSheet: SheetItem<BaseProductionDiary>;
  suppliesConsumedSheet: SheetItem<SuppliesConsumed>;
  outputsByWarehouseSheet: SheetItem<OutputsByWarehouse>;
  costsRecordSheet: SheetItem<CostsRecord>;
  warehouseEntriesSheet: SheetItem<WarehouseEntries>;
  salesRecordSheet: SheetItem<SalesRecord>;
  chickenGroupsSheet: SheetItem<ChickenGroups>;
}

export default async function page() {
  const googleClient = await google.auth.getClient({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT.credentials.client_email,
      client_id: GOOGLE_SERVICE_ACCOUNT.credentials.client_id,
      private_key: GOOGLE_SERVICE_ACCOUNT.credentials.private_key,
      private_key_id: GOOGLE_SERVICE_ACCOUNT.credentials.private_key_id,
      project_id: GOOGLE_SERVICE_ACCOUNT.projectId,
      token_url: GOOGLE_SERVICE_ACCOUNT.credentials.token_url,
      type: GOOGLE_SERVICE_ACCOUNT.credentials.type,
      universeDomain: 'googleapis.com'
    },
    scopes: GOOGLE_SERVICE_ACCOUNT.scopes
  });

  const spreadSheetClient = google.sheets({
    auth: googleClient as any,
    version: 'v4'
  });

  const sheet = await spreadSheetClient.spreadsheets.get({
    ranges: [
      'Base de producción diaria!A:U',
      'Insumos consumidos gastos!A:G',
      'Salidas por almacen!A:G',
      'Registro de costos!A:G',
      'Entradas por almacen!A:G',
      'Registro de ventas!A:Q',
      'Lotes!A:A'
    ],
    spreadsheetId: '1oGxcDIyA5v6r72EnnClsHbzqpp7Sp9JOHQutOZXqtb0',
    includeGridData: true
  });

  const data: SheetItem<any>[] = [];

  const getPrimitiveValue = (value: any) => {
    if (value?.stringValue) {
      return value?.stringValue;
    }

    if (value?.numberValue) {
      return value?.numberValue;
    }

    if (value?.boolValue) {
      return value?.boolValue;
    }

    if (value?.formulaValue) {
      return value?.formulaValue;
    }

    if (value?.errorValue) {
      return value?.errorValue;
    }

    return null;
  };

  function excelDateToJSDate(excelDate: number) {
    // Restar 1 porque Excel incluye el día 1 de enero de 1900 como día 1
    // Restar 1 adicional por el error de Excel que cuenta 29 de febrero de 1900 (no existió)
    const jsDate = new Date(1900, 0, 1); // Fecha inicial: 1 de enero de 1900
    jsDate.setDate(jsDate.getDate() + excelDate - 2); // Ajustar los días
    return jsDate;
  }

  function toLocalIsoDateFormat(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  sheet?.data?.sheets?.forEach((sheet) => {
    if (sheet?.properties?.title === 'Base de producción diaria') {
      const newSheet: SheetItem<BaseProductionDiary> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const baseProductionDiary: BaseProductionDiary[] = [];

      sheet?.data?.map((row) => {
        row?.rowData?.forEach((cell, i) => {
          const date =
            i != 0
              ? toLocalIsoDateFormat(
                  excelDateToJSDate(
                    getPrimitiveValue(cell?.values?.[0]?.effectiveValue)
                  )
                )
              : getPrimitiveValue(cell?.values?.[0]?.effectiveValue);

          baseProductionDiary.push({
            date: date,
            dateFormatted: cell?.values?.[0]?.formattedValue as string,
            quantityOfChickenOfDay: getPrimitiveValue(
              cell?.values?.[1]?.effectiveValue
            ),
            projectedEggs: getPrimitiveValue(cell?.values?.[2]?.effectiveValue),
            realEggs: getPrimitiveValue(cell?.values?.[3]?.effectiveValue),
            projectedEggBox: getPrimitiveValue(
              cell?.values?.[4]?.effectiveValue
            ),
            realEggBox: getPrimitiveValue(cell?.values?.[5]?.effectiveValue),
            complianceOfDay: getPrimitiveValue(
              cell?.values?.[6]?.effectiveValue
            ),
            projectedCumulativeEggs: getPrimitiveValue(
              cell?.values?.[7]?.effectiveValue
            ),
            realCumulativeEggs: getPrimitiveValue(
              cell?.values?.[8]?.effectiveValue
            ),
            projectedFoodPounds: getPrimitiveValue(
              cell?.values?.[9]?.effectiveValue
            ),
            realFoodPounds: getPrimitiveValue(
              cell?.values?.[10]?.effectiveValue
            ),
            projectedCumulativeFoodPounds: getPrimitiveValue(
              cell?.values?.[11]?.effectiveValue
            ),
            realCumulativeFoodPounds: getPrimitiveValue(
              cell?.values?.[12]?.effectiveValue
            ),
            ageChickenGroupDays: getPrimitiveValue(
              cell?.values?.[13]?.effectiveValue
            ),
            ageChickenGroupWeeks: getPrimitiveValue(
              cell?.values?.[14]?.effectiveValue
            ),
            chickenGroup: getPrimitiveValue(cell?.values?.[15]?.effectiveValue),
            deadChickensDay: getPrimitiveValue(
              cell?.values?.[16]?.effectiveValue
            ),
            originalQuantityOfChickens: getPrimitiveValue(
              cell?.values?.[17]?.effectiveValue
            ),
            deadChickensCumulative: getPrimitiveValue(
              cell?.values?.[18]?.effectiveValue
            ),
            lostChickens: getPrimitiveValue(cell?.values?.[19]?.effectiveValue),
            cumulativeLostChickens: getPrimitiveValue(
              cell?.values?.[20]?.effectiveValue
            )
          });
        });
      });

      newSheet.sheetRows.push(...baseProductionDiary);

      data.push(newSheet);
    }

    if (sheet?.properties?.title === 'Insumos consumidos gastos') {
      const newSheet: SheetItem<SuppliesConsumed> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const suppliesConsumed: SuppliesConsumed[] = [];

      sheet?.data?.map((row) => {
        row?.rowData?.forEach((cell, i) => {
          suppliesConsumed.push({
            date:
              i != 0
                ? toLocalIsoDateFormat(
                    excelDateToJSDate(
                      getPrimitiveValue(cell?.values?.[0]?.effectiveValue)
                    )
                  )
                : getPrimitiveValue(cell?.values?.[0]?.effectiveValue),
            dateFormatted: cell?.values?.[0]?.formattedValue as string,
            product: getPrimitiveValue(cell?.values?.[1]?.effectiveValue),
            quantity: getPrimitiveValue(cell?.values?.[2]?.effectiveValue),
            unitPrice: getPrimitiveValue(cell?.values?.[3]?.effectiveValue),
            totalCost: getPrimitiveValue(cell?.values?.[4]?.effectiveValue),
            type: getPrimitiveValue(cell?.values?.[5]?.effectiveValue),
            chickenGroup: getPrimitiveValue(cell?.values?.[6]?.effectiveValue)
          });
        });
      });

      newSheet.sheetRows.push(...suppliesConsumed);

      data.push(newSheet);
    }

    if (sheet?.properties?.title === 'Salidas por almacen') {
      const newSheet: SheetItem<OutputsByWarehouse> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const outputsByWarehouse: OutputsByWarehouse[] = [];

      sheet?.data?.map((row) => {
        row?.rowData?.forEach((cell, i) => {
          outputsByWarehouse.push({
            warehouse: getPrimitiveValue(cell?.values?.[0]?.effectiveValue),
            product: getPrimitiveValue(cell?.values?.[1]?.effectiveValue),
            quantity: getPrimitiveValue(cell?.values?.[2]?.effectiveValue),
            date:
              i != 0
                ? toLocalIsoDateFormat(
                    excelDateToJSDate(
                      getPrimitiveValue(cell?.values?.[3]?.effectiveValue)
                    )
                  )
                : getPrimitiveValue(cell?.values?.[3]?.effectiveValue),
            dateFormatted: cell?.values?.[3]?.formattedValue as string,
            eggQuantity: getPrimitiveValue(cell?.values?.[4]?.effectiveValue),
            originChickenGroup: getPrimitiveValue(
              cell?.values?.[5]?.effectiveValue
            ),
            description: getPrimitiveValue(cell?.values?.[6]?.effectiveValue)
          });
        });
      });

      newSheet.sheetRows.push(...outputsByWarehouse);

      data.push(newSheet);
    }

    if (sheet?.properties?.title === 'Registro de costos') {
      const newSheet: SheetItem<CostsRecord> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const costsRecord: CostsRecord[] = [];

      sheet?.data?.map((row) => {
        row?.rowData?.forEach((cell, i) => {
          costsRecord.push({
            date:
              i != 0
                ? toLocalIsoDateFormat(
                    excelDateToJSDate(
                      getPrimitiveValue(cell?.values?.[0]?.effectiveValue)
                    )
                  )
                : getPrimitiveValue(cell?.values?.[0]?.effectiveValue),
            dateFormatted: cell?.values?.[0]?.formattedValue as string,
            product: getPrimitiveValue(cell?.values?.[1]?.effectiveValue),
            quantity: getPrimitiveValue(cell?.values?.[2]?.effectiveValue),
            unitPrice: getPrimitiveValue(cell?.values?.[3]?.effectiveValue),
            totalCost: getPrimitiveValue(cell?.values?.[4]?.effectiveValue),
            type: getPrimitiveValue(cell?.values?.[5]?.effectiveValue),
            chickenGroup: getPrimitiveValue(cell?.values?.[6]?.effectiveValue)
          });
        });
      });

      newSheet.sheetRows.push(...costsRecord);

      data.push(newSheet);
    }

    if (sheet?.properties?.title === 'Entradas por almacen') {
      const newSheet: SheetItem<WarehouseEntries> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const warehouseEntries: WarehouseEntries[] = [];

      sheet?.data?.map((row) => {
        row?.rowData?.forEach((cell, i) => {
          warehouseEntries.push({
            warehouse: getPrimitiveValue(cell?.values?.[0]?.effectiveValue),
            product: getPrimitiveValue(cell?.values?.[1]?.effectiveValue),
            quantity: getPrimitiveValue(cell?.values?.[2]?.effectiveValue),
            date:
              i != 0
                ? toLocalIsoDateFormat(
                    excelDateToJSDate(
                      getPrimitiveValue(cell?.values?.[3]?.effectiveValue)
                    )
                  )
                : getPrimitiveValue(cell?.values?.[3]?.effectiveValue),
            dateFormatted: cell?.values?.[3]?.formattedValue as string,
            eggQuantity: getPrimitiveValue(cell?.values?.[4]?.effectiveValue),
            originChickenGroup: getPrimitiveValue(
              cell?.values?.[5]?.effectiveValue
            ),
            description: getPrimitiveValue(cell?.values?.[6]?.effectiveValue)
          });
        });
      });

      newSheet.sheetRows.push(...warehouseEntries);

      data.push(newSheet);
    }

    if (sheet?.properties?.title === 'Registro de ventas') {
      const newSheet: SheetItem<SalesRecord> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const salesRecord: SalesRecord[] = [];

      sheet?.data?.map((row) => {
        row?.rowData?.forEach((cell, i) => {
          salesRecord.push({
            date:
              i != 0
                ? toLocalIsoDateFormat(
                    excelDateToJSDate(
                      getPrimitiveValue(cell?.values?.[0]?.effectiveValue)
                    )
                  )
                : getPrimitiveValue(cell?.values?.[0]?.effectiveValue),
            dateFormatted: cell?.values?.[0]?.formattedValue as string,
            product: getPrimitiveValue(cell?.values?.[1]?.effectiveValue),
            quantity: getPrimitiveValue(cell?.values?.[2]?.effectiveValue),
            eggQuantity: getPrimitiveValue(cell?.values?.[3]?.effectiveValue),
            unitPrice: getPrimitiveValue(cell?.values?.[4]?.effectiveValue),
            customer: getPrimitiveValue(cell?.values?.[5]?.effectiveValue),
            paid: getPrimitiveValue(cell?.values?.[6]?.effectiveValue),
            saleStatus: getPrimitiveValue(cell?.values?.[7]?.effectiveValue),
            saleReason: getPrimitiveValue(cell?.values?.[8]?.effectiveValue),
            saleLossReason: getPrimitiveValue(
              cell?.values?.[9]?.effectiveValue
            ),
            customerComments: getPrimitiveValue(
              cell?.values?.[10]?.effectiveValue
            ),
            chickenGroup: getPrimitiveValue(cell?.values?.[11]?.effectiveValue),
            salesMan: getPrimitiveValue(cell?.values?.[12]?.effectiveValue),
            internalComments: getPrimitiveValue(
              cell?.values?.[13]?.effectiveValue
            ),
            productCategory: getPrimitiveValue(
              cell?.values?.[14]?.effectiveValue
            ),
            totalSale: getPrimitiveValue(cell?.values?.[15]?.effectiveValue),
            totalPending: getPrimitiveValue(cell?.values?.[16]?.effectiveValue)
          });
        });
      });

      newSheet.sheetRows.push(...salesRecord);

      data.push(newSheet);
    }

    if (sheet?.properties?.title === 'Lotes') {
      const newSheet: SheetItem<ChickenGroups> = {
        sheetId: sheet?.properties?.sheetId!,
        sheetName: sheet?.properties?.title,
        sheetRows: []
      };

      const chickenGroups: ChickenGroups[] = [];

      sheet?.data?.map((row) => {
        row?.rowData
          ?.filter((c, i) => i != 0)
          .forEach((cell, i) => {
            chickenGroups.push({
              chickenGroup: getPrimitiveValue(cell?.values?.[0]?.effectiveValue)
            });
          });

        newSheet.sheetRows.push(...chickenGroups);
      });

      data.push(newSheet);
    }
  });

  const kpisRecords: KpiRecordsPassed = {
    productionSheet: data[0] as SheetItem<BaseProductionDiary>,
    suppliesConsumedSheet: data[1] as SheetItem<SuppliesConsumed>,
    outputsByWarehouseSheet: data[2] as SheetItem<OutputsByWarehouse>,
    costsRecordSheet: data[3] as SheetItem<CostsRecord>,
    warehouseEntriesSheet: data[4] as SheetItem<WarehouseEntries>,
    salesRecordSheet: data[5] as SheetItem<SalesRecord>,
    chickenGroupsSheet: data[6] as SheetItem<ChickenGroups>
  };

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Dashboard de Granja
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Producción</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="w-full max-w-full overflow-auto">
              <ClientDataDashboard kpiData={kpisRecords} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
