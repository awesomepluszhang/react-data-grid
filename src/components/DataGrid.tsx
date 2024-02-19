import React, { useState, useMemo, useCallback } from 'react';

interface DataGridProps {
  data: any[];
  columns: { key: string; header: string }[];
  pageSize: number;
}

const DataGrid: React.FC<DataGridProps> = ({ data, columns, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback((key: string) => {
    setSortedColumn(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }, [sortOrder])

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
      <p>Sorted Column: {sortedColumn} {sortOrder}</p>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
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