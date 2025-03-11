import { MonitorSmartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableDeviceType = ({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) =>
  Boolean(data?.length) &&
  !isLoading && (
    <div className="w-full bg-card p-6 rounded-lg mt-20">
      <div className="flex flex-row items-center mb-4">
        <MonitorSmartphone className="mr-2 h-8 w-8" />
        <h3 className="text-2xl font-semibold">Cliques por Tipo de Aparelho</h3>
      </div>
      {isLoading && (
        <Card className="w-full h-[300px] p-6">
          <Skeleton className="h-7 w-36 mb-4" />
          <div className="h-[calc(100%-40px)]">
            <Skeleton className="w-full h-full" />
          </div>
        </Card>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Devices</TableHead>
              <TableHead>Cliques</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((activity: any) => (
              <TableRow key={activity.device}>
                <TableCell>{activity.device}</TableCell>
                <TableCell>{activity.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* {Boolean(!data?.length) && !isLoading && (
      <div className="w-full flex flex-col items-center justify-center h-[100px]">
        <div className="border rounded-md py-5 px-7 text-center">
          Sem dados para serem mostrados no momento.
        </div>
      </div>
    )} */}
    </div>
  );

export default TableDeviceType;
