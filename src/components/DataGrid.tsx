import { orderBy } from 'lodash';
import React, { useState, useMemo, useCallback, useEffect } from 'react';

interface Column<T> {
  key: keyof T;
  header: string;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize: number;
}

const DataGrid = <T extends Record<string, any>>({ data, columns, pageSize }: DataGridProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [sortedColumn, setSortedColumn] = useState<keyof T>(columns[0].key);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setFilteredData(orderBy(filteredData, [sortedColumn], [sortOrder]))
  }, [])

  const handleSort = useCallback((key: string) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortedColumn(key);
    setSortOrder(order);
    setFilteredData(orderBy(filteredData, [key], [order]))
  }, [filteredData, sortOrder])

  const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  }, [data])

  const totalPages = useMemo(() => Math.ceil(filteredData.length / pageSize), [filteredData.length, pageSize]);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize), [currentPage, filteredData, pageSize]);

  return (
    <div className='data-grid-container'>
      <input type="text" placeholder="Search..." onChange={handleFilter} />
      <p>Sorted Column: {sortedColumn as string}</p>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key as string} onClick={() => handleSort(col.key as string)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.key as string}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(Array(totalPages).keys()).map(pageNum => (
          <button key={pageNum} onClick={() => setCurrentPage(pageNum + 1)}>
            {pageNum + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataGrid;