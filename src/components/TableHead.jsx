import { useState } from "react";

const TableHead = ({ columns, handleSorting, headerColor = "#f5f5f5" }) => {
    const [sortColumn, setSortColumn] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortColumn && order === "asc" ? "desc" : "asc";
        setSortColumn(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    return (
                        <th
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            style={{ backgroundColor: headerColor}}
                            className={sortable ? 'sortable' : ''}
                        >
                            {label}
                            {sortable && (
                            <span className="sort-icon">
                                {sortColumn === accessor &&
                                (order === 'asc' ? '▲' : '▼')}
                            </span>
                            )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;