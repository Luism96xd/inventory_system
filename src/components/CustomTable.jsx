import React, { useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '@/styles/Tables.module.css';

const CustomTable = ({ columns, data, onRowClick, headerColor = '#eeeeee' }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleHeaderClick = (column, index) => {
    if (column.sortable) {
      if (sortColumn === index) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(index);
        setSortDirection('asc');
      }
    }
  };

  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    }
    if (row.selectable) {
      if (selectedRows.includes(row)) {
        setSelectedRows(selectedRows.filter((r) => r !== row));
      } else {
        setSelectedRows([...selectedRows, row]);
      }
    }
  };

  const sortedData = useMemo(() => {
    if (sortColumn) {
      const sorted = [...data].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue === bValue) {
          return 0;
        }
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        }
        return aValue > bValue ? -1 : 1;
      });
      return sorted;
    }
    return data;
  }, [sortColumn, sortDirection, data]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={`Column_${index}`}
                onClick={() => handleHeaderClick(column, index)}
                style={{ backgroundColor: headerColor}}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.title}
                {column.sortable && (
                  <span className="sort-icon">
                    {sortColumn === index &&
                      (sortDirection === 'asc' ? '▲' : '▼')}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <Droppable droppableId="table">
          {(provided) => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
              {sortedData.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={selectedRows.includes(row) ? 'selected' : ''}
                      onClick={() => handleRowClick(row)}
                    >
                      {Object.keys(data[0]).map((key) => (
                        <td key={index}>{row[key]}</td>
                      ))}
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default CustomTable;