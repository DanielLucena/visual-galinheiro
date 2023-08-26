import React, { useState, useMemo, useContext } from "react";
import { useTable, Column } from "react-table";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "./dataTable.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { nosRatreados } from "../../utils/staticConfig";
import RegistrosContext from "../../context/registrosContext";
import { nosGetData } from "../../utils/nosGetData";
import StatusBar from "../../components/StatusBar/StatusBar";

interface DataItem {
  id: number;
  date: Date;
  time: string;
  Amonia: number;
  Temperatura: number;
  Umidade: number;
  Luminosidade: Number;
}

const DataTable: React.FC = () => {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {
    registrosAllNos,
    setRegistrosAllNos,
    bigDataLoaded,
    setBigDataLoaded,
  } = useContext(RegistrosContext);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (loading) return;
  //     if (!user) return navigate("/login");
  //   };

  //   fetchData();
  // }, [user, loading]);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      if (!user) return navigate("/login");
      const data = await nosGetData();

      setRegistrosAllNos(data);
      setBigDataLoaded(true);
    };
    if (!bigDataLoaded) {
      fetchData();
    }
  }, [user, loading]);

  const [data, setData] = useState<DataItem[]>([
    // {
    //   id: 1,
    //   date: new Date(),
    //   time: "12:00",
    //   Amonia: 10,
    //   Temperatura: 20,
    //   Umidade: 30,
    //   Luminosidade: 10,
    // },
    // {
    //   id: 2,
    //   date: new Date(),
    //   time: "15:30",
    //   Amonia: 15,
    //   Temperatura: 25,
    //   Umidade: 35,
    //   Luminosidade: 20,
    // },
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
      { Header: "Luminosidade", accessor: "Luminosidade" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<DataItem>({ columns, data });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [idFilter, setIdFilter] = useState<string>("");
  const [no, setNo] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setNo(event.target.value as string);
  };

  useEffect(() => {
    if (bigDataLoaded) {
      setData(
        registrosAllNos[Number(no)].registros.map((registro) => {
          return {
            id: registro.id,
            date: new Date(registro.timestamp),
            time: "12:00",
            Amonia: registro.amonia,
            Temperatura: registro.temperatura,
            Umidade: registro.umidade,
            Luminosidade: registro.luminosidade,
          };
        })
      );
    }
  }, [no, bigDataLoaded]);

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
    <Container maxWidth="lg">
      <Box paddingY={5}>
        <Typography variant="h4">Registros</Typography>
      </Box>
      <div className="dataTable">
        {/* <h1>Registros</h1> */}

        <Box sx={{ minWidth: 120 }}>
          {/* <StatusBar /> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">No</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={no}
              label="No"
              onChange={handleChange}
            >
              {nosRatreados.map((no) => {
                return <MenuItem value={no - 1}>{no.toString()}</MenuItem>;
              })}

              {/* <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          {/* <label htmlFor="id-filter">Id Node</label> */}
          {/* <input
            type="text"
            id="id-filter"
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
          /> */}
          {/* <label htmlFor="date-filter">Filtrar por Data:</label> */}
          {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        /> */}
        </Box>
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
    </Container>
  );
};

export default DataTable;
