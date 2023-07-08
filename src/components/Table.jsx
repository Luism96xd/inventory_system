"use client";
import TableBody from "@/components/TableBody";
import TableHead from "@/components/TableHead";
import styles from '@/styles/Tables.module.css';
import { useSortableTable } from "@/hooks/useSortableTable";

const Table = ({ caption, data, columns, id, tableName, actions = true}) => {
    //const [tableData, handleSorting] = useSortableTable(data, columns, id);
    return (
        <table className={styles["custom-table"]}>
            <caption className="font-semibold pb-4">{caption}</caption>
            <TableHead columns={columns} actions={actions}/> {/*handleSorting={handleSorting} */}
            <TableBody columns={columns} tableData={data} id={id} tableName={tableName} actions={actions}/>
        </table>
    );
};

export default Table;