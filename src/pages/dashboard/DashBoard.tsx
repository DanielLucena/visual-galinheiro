import { useEffect, useState } from "react";
import MultipleLineChart from "../../components/charts/MultipleLineChart";
import { RegistrosUmNo } from "../../utils/resgistroTypes";
import "./dashboard.css";

import Paper from "@mui/material/Paper";
import { nosGetData } from "../../utils/nosGetData";
import { nosObserver } from "../../utils/nosObserver";
import StatusBar from "../../components/StatusBar/StatusBar";

// export type RegistroType = {
//   id: number;
//   amonia: number;
//   luminosidade: number;
//   temperatura: number;
//   umidade: number;
//   timestamp: Timestamp;
// };
// export type RegistrosUmNo = {
//   noId: number;
//   registros: RegistroType[];
// };

function DashBoard() {
  // const [registrosAllNos, setRegistrosAllnos] = useState<RegistrosPorSensor>({
  //   temperatura: [],
  //   umidade: [],
  //   amonia: [],
  //   luminosidade: [],
  //   timestamp: [],
  // });
  // const [isLoading, setIsLoading] = useState(true);
  const [registrosAllNos, setRegistrosAllnos] = useState<RegistrosUmNo[]>([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  //const [onlyTemp, setOnlyTemp] = useState<RegistrosUmaVariavel[]>([]);
  //console.log("renderwith", registrosAllNos);

  useEffect(() => {
    const fetchData = async () => {
      const data = await nosGetData();

      setRegistrosAllnos(data);
      setInitialDataLoaded(true);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (initialDataLoaded) {
      nosObserver(registrosAllNos, setRegistrosAllnos);
    }
  }, [initialDataLoaded]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const data = await nosGetDataPorSensor();
  //     console.log("data", data);
  //     setRegistrosAllnos(data);
  //     setIsLoading(false);

  //     //setRegistrosAllnos(data);
  //     // const tempData = await getOnlyTemp(data);
  //     // setOnlyTemp(tempData);
  //     // console.log("tempData", tempData);

  //     //console.log("ok");
  //   };
  //   fetchData();
  //   //console.log("len", registrosAllNos.temperatura.length);

  //   //.catch(console.error);
  // }, []);

  // useEffect(() => {
  //   console.log("registrosAllNos mudou");
  //   const datasets = registrosAllNos.map((registrosNo) => {
  //     const dataset: RegistrosUmaVariavel = {
  //       noId: registrosNo.noId,
  //       valores: registrosNo.registros
  //         .map((resgistro) => {
  //           return resgistro.temperatura;
  //         })
  //         .reverse(),
  //     };
  //     return dataset;
  //   });
  //   graphics = <MultipleLineChart nos={datasets} title="temperatura" />;
  //   graphics = <h2>ola mundo</h2>;
  //   console.log("graphics mudou");
  // }, []);

  // const getData = () => {
  //   const NosRef = collection(db, "No");
  //   const q: Query<DocumentData> = query(
  //     NosRef,
  //     where("id", "==", 2),
  //     orderBy("timestamp", "desc"),
  //     limit(10)
  //   );
  //   const unsubscribre = onSnapshot(
  //     q as Query<QuerySnapshot<DocumentData>>,
  //     (snapshot) => {
  //       const registros: RegistroType[] = [];
  //       snapshot.docs.forEach((doc) => {
  //         const temp = doc.data() as unknown;
  //         const data = temp as RegistroType;
  //         const registro: RegistroType = {
  //           id: data.id,
  //           amonia: data.amonia,
  //           luminosidade: data.luminosidade,
  //           temperatura: data.temperatura,
  //           umidade: data.umidade,
  //           timestamp: data.timestamp,
  //         };
  //         registros.push(registro);
  //       });
  //     }
  //   );

  //   return unsubscribre;
  // };

  // getData();
  // fetchData();
  // console.log("dashboard", registrosAllNos);
  // console.log("temp", registrosAllNos.temperatura);
  //console.log(registrosAllNos.length);

  // if (isLoading) {
  //   return <h1>loading...</h1>;
  // }
  const getDatasetsUmaVariavel = (
    registrosAllNos: RegistrosUmNo[],
    sensor: "temperatura" | "luminosidade" | "amonia" | "umidade"
  ) => {
    return registrosAllNos.map((no) => {
      return {
        label: no.noId.toString(),
        data: no.registros.map((registro) => {
          return registro[sensor];
        }),
      };
    });
  };

  return (
    <div>
      <h1>This is the DashBoard page</h1>
      <StatusBar />
      <div className="charts-grid">
        <Paper elevation={3} className="multi-line-chart">
          <MultipleLineChart
            title={"temperatura"}
            nos={getDatasetsUmaVariavel(registrosAllNos, "temperatura")}
          />
        </Paper>

        <Paper elevation={3} className="multi-line-chart">
          <MultipleLineChart
            title={"umidade"}
            nos={getDatasetsUmaVariavel(registrosAllNos, "umidade")}
          />
        </Paper>

        <Paper elevation={3} className="multi-line-chart">
          <MultipleLineChart
            title={"amonia"}
            nos={getDatasetsUmaVariavel(registrosAllNos, "amonia")}
          />
        </Paper>

        <Paper elevation={3} className="multi-line-chart">
          <MultipleLineChart
            title={"luminosidade"}
            nos={getDatasetsUmaVariavel(registrosAllNos, "luminosidade")}
          />
        </Paper>
      </div>
    </div>
  );
}

export default DashBoard;
