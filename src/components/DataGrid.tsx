import { orderBy } from 'lodash';
import React, { useState, useCallback, useMemo } from 'react';
import { VariableSizeGrid } from 'react-window';
import styled from 'styled-components';

interface Column<T> {
  key: keyof T;
  header: string;
  width?: number;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  itemHeight?: number;
  pageSize: number;
}

type Direction = 'asc' | 'desc';

const StyledVariableSizeGrid = styled(VariableSizeGrid)`
  margin: auto;
`;

const DataGrid = <T extends Record<string, any>>({ data, columns, itemHeight = 20, pageSize }: DataGridProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: Direction } | null>(null);

  const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  }, [data])

  const handleSort = useCallback((key: keyof T) => {
    let direction: Direction;
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'asc';
    }
    setSortConfig({ key: key, direction });
    setFilteredData(orderBy(filteredData, [key], [direction]))
  }, [filteredData, sortConfig]);

  const totalRows = useMemo(() => filteredData.length, [filteredData.length]);
  const totalPages = useMemo(() =>  Math.ceil(totalRows / pageSize), [pageSize, totalRows]);
  const nextPage = useCallback(() => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  }, []);

  const cellRenderer = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
    const item = filteredData[rowIndex];
    const column = columns[columnIndex];
    return (
      <div style={style}>
        {item[column.key]}
      </div>
    );
  };

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleFilter} />
      <div>
        {columns.map(col => (
          <span key={col.key as string} onClick={() => handleSort(col.key)}>
            {col.header} {sortConfig && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </span>
        ))}
      </div>
      <StyledVariableSizeGrid
        columnCount={columns.length}
        columnWidth={(index: number) => columns[index].width ?? 100}
        rowCount={filteredData.length}
        rowHeight={(index: number) => itemHeight}
        width={columns.reduce((sum, col) => sum + (col.width ?? 100), 0)}
        height={pageSize * itemHeight}
      >
        {cellRenderer}
      </StyledVariableSizeGrid>
      <div>
        <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default DataGrid;