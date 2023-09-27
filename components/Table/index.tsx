import { Dispatch, SetStateAction } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
  PaginationState,
} from '@tanstack/react-table';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SingleValue } from 'react-select';

import { DataLimitEnum } from '../../ts/types/enum/DataLimit';
import { Cart, CartProducts } from '../../ts/types/main/Cart';
import { Option } from '../../ts/types/main/Option';
import { Product } from '../../ts/types/main/Product';
import DataLimit from '../DataLimit';
import Loader from '../Loader';

type TableOrColumns = Product | Cart | CartProducts;

const Table = <T extends TableOrColumns>({
  tableType,
  data,
  columns,
  isFetching,
  pageSize,
  pageCount,
  pagination,
  setPagination,
}: {
  tableType: string;
  data: undefined | T[];
  columns: ColumnDef<T>[];
  isFetching: boolean;
  pageSize: number;
  pageCount?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}) => {
  const limitOptions: Option<DataLimitEnum>[] = [
    { label: '10', value: DataLimitEnum.SEPULUH },
    { label: '20', value: DataLimitEnum.DUA_PULUH },
    { label: '30', value: DataLimitEnum.TIGA_PULUH },
    { label: '40', value: DataLimitEnum.EMPAT_PULUH },
    { label: '50', value: DataLimitEnum.LIMA_PULUH },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns: columns ?? [],
    pageCount: pageCount ?? 1,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="mt-5 overflow-hidden bg-white border rounded-md shadow-md -border--primary-20">
      <article className="overflow-x-auto">
        <table className="w-full overflow-x-auto">
          <thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b -border--primary-10">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="p-5 text-start -text--primary nth-2:min-w-[200px]"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isFetching ? (
              <tr className="bg-white border-b -border--primary-10 border-opacity-20">
                <td colSpan={columns.length}>
                  <Loader size="5xl" />
                </td>
              </tr>
            ) : table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows?.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={`capitalize nth-2:-text--primary-90 nth-2:font-semibold hover:bg-gray-100/60 ${
                      tableType === 'carts' &&
                      'nth-2:underline underline-offset-2'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="p-5 border-b -border--primary-10"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr className="text-center bg-white border-b -border--primary-10 border-opacity-20">
                <td
                  colSpan={columns.length}
                  className="py-16 text-lg font-semibold tracking-wide -text--primary"
                >
                  <h3>No Results</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>

      {tableType !== 'cartProducts' && (
        <article className="flex flex-col items-center justify-center p-5 sm:flex-row sm:justify-end sm:px-10 gap-7">
          <DataLimit
            instanceId="limit"
            placeholder={pageSize}
            options={limitOptions}
            onChange={(option: unknown | SingleValue<Option<DataLimitEnum>>) =>
              option &&
              table.setPageSize((option as Option<DataLimitEnum>).value)
            }
          />

          <nav className="flex items-center justify-end gap-5">
            <article className="flex items-center gap-2">
              <span>Page</span>
              <span className="font-semibold -text--primary">
                {table.getState().pagination.pageIndex
                  ? table.getState().pagination.pageIndex + 1
                  : 1}
              </span>
              <span>of</span>
              <span className="font-semibold -text--primary">
                {table.getPageCount() ? table.getPageCount() : 1}
              </span>
            </article>

            <button
              className="p-[10px] border rounded -text--primary-50 hover:-text--primary hover:cursor-pointer transition-all duration-[.2s] ease-in-out -border--primary-50 hover:-border--primary-90 focus:-border--primary-90 active:-border--primary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <button
              className="p-[10px] border rounded -text--primary-50 hover:-text--primary hover:cursor-pointer transition-all duration-[.2s] ease-in-out -border--primary-50 hover:-border--primary-90 focus:-border--primary-90 active:-border--primary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </article>
      )}
    </section>
  );
};

export default Table;
