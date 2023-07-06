"use client";
import TableBody from "@/components/TableBody";
import TableHead from "@/components/TableHead";
import styles from '@/styles/Tables.module.css';
import { useSortableTable } from "@/hooks/useSortableTable";

const Table = ({ caption, data, columns, accessor}) => {
    const [tableData, handleSorting] = useSortableTable(data, columns, accessor);

    return (

        <table className={styles["custom-table"]}>
            <caption className="font-semibold pb-4">{caption}</caption>
            <TableHead columns={columns} handleSorting={handleSorting} />
            <TableBody columns={columns} tableData={tableData} accessor={accessor}/>
        </table>

    );
};

export default Table;