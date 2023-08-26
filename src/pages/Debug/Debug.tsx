import { useContext, useEffect } from "react";
import MultipleLineChart from "../../components/charts/MultipleLineChart";
import { RegistrosUmNo } from "../../utils/resgistroTypes";
import "../dashboard/dashboard.css";

import Paper from "@mui/material/Paper";
import { nosGetData } from "../../utils/nosGetData";
import StatusBar from "../../components/StatusBar/StatusBar";
import { Box, Container, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import RegistrosContext from "../../context/registrosContext";

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

function Debug() {
  let navigate = useNavigate();
  const {
    registrosAllNos,
    setRegistrosAllNos,
    bigDataLoaded,
    setBigDataLoaded,
    initialTime,
  } = useContext(RegistrosContext);
  // const [registrosAllNos, setRegistrosAllnos] = useState<RegistrosPorSensor>({
  //   temperatura: [],
  //   umidade: [],
  //   amonia: [],
  //   luminosidade: [],
  //   timestamp: [],
  // });
  // const [isLoading, setIsLoading] = useState(true);
  //const [registrosAllNos, setRegistrosAllnos] = useState<RegistrosUmNo[]>([]);
  //const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [user, loading] = useAuthState(auth);
  //const [onlyTemp, setOnlyTemp] = useState<RegistrosUmaVariavel[]>([]);
  //console.log("renderwith", registrosAllNos);

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
  // useEffect(() => {
  //   if (initialDataLoaded) {
  //     nosObserver(registrosAllNos, setRegistrosAllnos);
  //   }
  // }, [initialDataLoaded]);

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
  const getMinutesOfTimestamps = (registrosAllNos: RegistrosUmNo[]) => {
    return registrosAllNos.map((no) => {
      return {
        label: no.noId.toString(),
        data: no.registros.map((registro) => {
          return new Date(registro.timestamp).getMinutes();
        }),
      };
    });
  };
  // const getRegistrosTimestamp = (registrosAllNos: RegistrosUmNo[]) => {
  //   return registrosAllNos.map((no) => {
  //     return {
  //       label: no.noId.toString(),
  //       data: no.registros.map((registro) => {
  //         return registro.timestamp;
  //       }),
  //     };
  //   });
  // };

  return (
    <Container maxWidth="lg">
      <Box paddingTop={5}>
        <Typography variant="h4">Debug</Typography>
      </Box>

      <div className="content-box">
        <StatusBar />
      </div>

      <div className="content-box">
        <div className="charts-grid">
          <Paper elevation={3} className="multi-line-chart">
            <MultipleLineChart
              unit="°C"
              title={"Temperatura"}
              nos={getDatasetsUmaVariavel(registrosAllNos, "temperatura")}
              initialTime={initialTime}
            />
          </Paper>

          <Paper elevation={3} className="multi-line-chart">
            <MultipleLineChart
              unit="%"
              title={"Umidade"}
              nos={getDatasetsUmaVariavel(registrosAllNos, "umidade")}
              initialTime={initialTime}
            />
          </Paper>

          <Paper elevation={3} className="multi-line-chart">
            <MultipleLineChart
              unit="ppm"
              title={"Amonia/CO2"}
              nos={getDatasetsUmaVariavel(registrosAllNos, "amonia")}
              initialTime={initialTime}
            />
          </Paper>

          <Paper elevation={3} className="multi-line-chart">
            <MultipleLineChart
              unit="lx"
              title={"Luminosidade"}
              nos={getDatasetsUmaVariavel(registrosAllNos, "luminosidade")}
              initialTime={initialTime}
            />
          </Paper>
          <Paper elevation={3} className="multi-line-chart">
            <MultipleLineChart
              unit=""
              title={"timestamps"}
              nos={getMinutesOfTimestamps(registrosAllNos)}
              initialTime={initialTime}
            />
          </Paper>
        </div>
      </div>
    </Container>
  );
}

export default Debug;
