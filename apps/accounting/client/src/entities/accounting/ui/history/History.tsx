import { Account, Transaction } from '@money-tracker/data-sdk';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@money-tracker/ui-sdk';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { getAccountName } from '../../libs';
import { useHistoryLocale } from './History.i18n';

interface HistoryProps {
  chart: Account[];
  value: Transaction[];
}

const columnHelper = createColumnHelper<Transaction>();

export function History({ chart, value }: HistoryProps) {
  const locale = useHistoryLocale();
  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: locale.columns.date.label,
        cell: (info) =>
          dayjs(info.getValue()).format(locale.columns.date.format),
      }),
      columnHelper.accessor('debit', {
        header: locale.columns.debitAccount.label,
        cell: (info) =>
          `(${info.getValue()}) ${getAccountName(chart, info.getValue())}`,
      }),
      columnHelper.accessor('credit', {
        header: locale.columns.creditAccount.label,
        cell: (info) =>
          `(${info.getValue()}) ${getAccountName(chart, info.getValue())}`,
      }),
      columnHelper.accessor('amount', {
        header: locale.columns.amount.label,
        cell: (info) => (
          <div className="text-right">
            {locale.columns.amount.formatter.format(info.getValue())}
          </div>
        ),
      }),
      columnHelper.accessor('note', {
        header: locale.columns.note.label,
      }),
    ],
    [chart, locale]
  );
  const table = useReactTable({
    columns,
    data: value,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <h1>Accounting History Component</h1>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
