import React, { useState, useMemo } from "react";
import { useTable, Column } from "react-table";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "./dataTable.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

interface DataItem {
  id: number;
  date: Date;
  time: string;
  Amonia: number;
  Temperatura: number;
  Umidade: number;
}

const DataTable: React.FC = () => {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      if (!user) return navigate("/login");
    };

    fetchData();
  }, [user, loading]);

  const [data] = useState<DataItem[]>([
    {
      id: 1,
      date: new Date(),
      time: "12:00",
      Amonia: 10,
      Temperatura: 20,
      Umidade: 30,
    },
    {
      id: 2,
      date: new Date(),
      time: "15:30",
      Amonia: 15,
      Temperatura: 25,
      Umidade: 35,
    },
    // Adicione mais dados aqui
  ]);

  const columns: Column<DataItem>[] = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Data e Hora",
        accessor: (row: DataItem) =>
          format(new Date(row.date), "dd/MM/yyyy HH:mm"),
      },
      { Header: "Amonia", accessor: "Amonia" },
      { Header: "Temperatura", accessor: "Temperatura" },
      { Header: "Umidade", accessor: "Umidade" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<DataItem>({ columns, data });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [idFilter, setIdFilter] = useState<string>("");
  // const [dateRange, setDateRange] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });

  // const filteredData = useMemo<DataItem[]>(
  //   () =>
  //     data.filter(
  //       (row) =>
  //         (dateRange.startDate
  //           ? new Date(row.date) >= dateRange.startDate
  //           : true) &&
  //         (dateRange.endDate
  //           ? new Date(row.date) <= dateRange.endDate
  //           : true) &&
  //         (idFilter ? row.id.toString() === idFilter : true)
  //     ),
  //   [data, dateRange]
  // );

  return (
    <div className="dataTable">
      <h1>Registros</h1>
      <div>
        <label htmlFor="id-filter">Id Node</label>
        <input
          type="text"
          id="id-filter"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
        />
        <label htmlFor="date-filter">Filtrar por Data:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="table-container">
        <table {...getTableProps()} className="floating-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
