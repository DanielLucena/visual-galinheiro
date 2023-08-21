import { useEffect, useState } from "react";
import MultipleLineChart from "../../components/charts/MultipleLineChart";
import { ResgistrosPorSensor } from "../../utils/resgistroTypes";
import "./dashboard.css";
import { nosGetDataPorSensor } from "../../utils/nosGetDataPorSensor";

import Paper from "@mui/material/Paper";

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
  const [registrosAllNos, setRegistrosAllnos] = useState<ResgistrosPorSensor>({
    temperatura: [],
    umidade: [],
    amonia: [],
    luminosidade: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  //const [onlyTemp, setOnlyTemp] = useState<RegistrosUmaVariavel[]>([]);
  //console.log("renderwith", registrosAllNos);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await nosGetDataPorSensor();
      console.log("data", data);
      setRegistrosAllnos(data);

      //setRegistrosAllnos(data);
      // const tempData = await getOnlyTemp(data);
      // setOnlyTemp(tempData);
      // console.log("tempData", tempData);

      //console.log("ok");
    };
    fetchData();
    //console.log("len", registrosAllNos.temperatura.length);
    setIsLoading(false);

    //.catch(console.error);
  }, []);

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
  console.log("dashboard", registrosAllNos);
  console.log("temp", registrosAllNos.temperatura);
  //console.log(registrosAllNos.length);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <h1>This is the DashBoard page</h1>
      {isLoading && <h2>loading...</h2>}
      <div className="charts-grid">
        <Paper elevation={3}>
          <div className="multi-line-chart">
            <MultipleLineChart
              title={"temperatura"}
              nos={registrosAllNos?.temperatura}
            />
          </div>
        </Paper>
        <Paper elevation={3}>
          <div style={{ width: 500 }}>
            <MultipleLineChart
              title={"umidade"}
              nos={registrosAllNos?.umidade}
            />
          </div>
        </Paper>
        <div style={{ width: 500 }}>
          <MultipleLineChart title={"amonia"} nos={registrosAllNos?.amonia} />
        </div>
        <div style={{ width: 500 }}>
          <MultipleLineChart
            title={"luminosidade"}
            nos={registrosAllNos?.luminosidade}
          />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
