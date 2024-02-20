import { orderBy } from 'lodash';
import React, { useState, useCallback, useMemo, memo, useRef } from 'react';
import { VariableSizeGrid } from 'react-window';
import styled from 'styled-components';
import { Pagination } from './Pagination';

const DEFAULT_ROW_HEIGHT = 20;
const DEFAULT_CONTAINER_HEIGHT = 300;
const DEFAULT_COLUMN_WIDTH = 100;

interface Column<T> {
  key: keyof T;
  header: string;
  width?: number;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize: number;
  rowHeight?: number;
  height?: number;
}

type Direction = 'asc' | 'desc';

const StyledVariableSizeGrid = styled(VariableSizeGrid)`
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin-top: 1em;
`;

const HeaderItem = styled.span`
  display: inline-block;
  background: rgb(244, 244, 244);
  padding: 1em 0;
`;

const StyledPagination = styled(Pagination)`
  margin: 1em;
`;

export const genericMemo: <C>(c: C) => C = memo;

export const DataGrid = genericMemo(
  <T extends Record<string, any>>({
    data,
    columns,
    pageSize,
    rowHeight = DEFAULT_ROW_HEIGHT,
    height = DEFAULT_CONTAINER_HEIGHT
  }: DataGridProps<T>) => {
    const [filteredData, setFilteredData] = useState<T[]>(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: Direction } | null>(
      null
    );
    const gridRef = useRef<VariableSizeGrid>(null);

    const handleFilter = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filtered = data.filter(item =>
          Object.values(item).some(val => String(val).toLowerCase().includes(value))
        );
        setCurrentPage(1);
        if (sortConfig) {
          setFilteredData(orderBy(filtered, [sortConfig?.key], [sortConfig?.direction]));
        } else {
          setFilteredData(filtered);
        }
      },
      [data, sortConfig]
    );

    const handleSort = useCallback(
      (key: keyof T) => {
        let direction: Direction;
        if (sortConfig && sortConfig.key === key) {
          direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
          direction = 'asc';
        }
        setCurrentPage(1);
        setSortConfig({ key: key, direction });
        setFilteredData(orderBy(filteredData, [key], [direction]));
      },
      [filteredData, sortConfig]
    );

    const totalRows = useMemo(() => filteredData.length, [filteredData.length]);
    const totalPages = useMemo(() => Math.ceil(totalRows / pageSize), [pageSize, totalRows]);
    const handlePageChange = useCallback(
      (page: number) => {
        setCurrentPage(page);
        gridRef.current?.scrollToItem({ align: 'start', rowIndex: (page - 1) * pageSize });
      },
      [pageSize]
    );

    const cellRenderer = ({
      columnIndex,
      rowIndex,
      style
    }: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    }) => {
      const item = filteredData[rowIndex];
      const column = columns[columnIndex];
      return <div style={style}>{item[column.key]}</div>;
    };

    return (
      <div>
        <input type="text" placeholder="Search..." onChange={handleFilter} />
        <HeaderContainer>
          {columns.map(col => (
            <HeaderItem
              key={col.key as string}
              onClick={() => handleSort(col.key)}
              style={{ width: col.width }}
            >
              {col.header}{' '}
              {sortConfig &&
                sortConfig.key === col.key &&
                (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </HeaderItem>
          ))}
        </HeaderContainer>
        <StyledVariableSizeGrid
          ref={gridRef}
          columnCount={columns.length}
          columnWidth={(index: number) => columns[index].width ?? DEFAULT_COLUMN_WIDTH}
          rowCount={filteredData.length}
          rowHeight={(index: number) => rowHeight}
          width={columns.reduce((sum, col) => sum + (col.width ?? DEFAULT_COLUMN_WIDTH), 0)}
          height={height}
        >
          {cellRenderer}
        </StyledVariableSizeGrid>
        <StyledPagination
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={0}
          startBoundaryCount={3}
        />
      </div>
    );
  }
);
