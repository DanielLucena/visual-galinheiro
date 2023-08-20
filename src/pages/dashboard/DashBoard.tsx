import {
  DocumentData,
  Query,
  QuerySnapshot,
  Timestamp,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import MultipleLineChart from "../../components/charts/MultipleLineChart";
import {
  RegistrosUmaVariavel,
  RegistroType,
  RegistrosUmNo,
  ResgistrosPorSensor,
} from "../../utils/resgistroTypes";
import "./dashboard.css";
import { getAllNosData } from "../../utils/nosObserver";
import { getOnlyTemp, nosGetData } from "../../utils/nosGetData";
import { nosGetDataPorSensor } from "../../utils/nosGetDataPorSensor";
import OneLineChart from "../../components/charts/OneLineChart";

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
      <div style={{ width: 700 }}>
        {isLoading === false ? (
          <MultipleLineChart
            title={"temperatura"}
            nos={registrosAllNos?.temperatura}
          />
        ) : (
          <h2>no data</h2>
        )}
      </div>
      {/* <ul>
        {registrosAllNos.temperatura.map((no) => {
          return (
            <li key={no.label} className="registroInfo">
              <h3>{no.label}</h3>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default DashBoard;
