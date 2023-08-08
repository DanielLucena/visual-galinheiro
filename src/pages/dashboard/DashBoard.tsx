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
import MultipleLineChart, {
  RegistrosUmaVariavel,
} from "../../components/charts/MultipleLineChart";
import "./dashboard.css";
import { getAllNosData } from "../../utils/nosObserver";

export type RegistroType = {
  id: number;
  amonia: number;
  luminosidade: number;
  temperatura: number;
  umidade: number;
  timestamp: Timestamp;
};
export type RegistrosUmNo = {
  noId: number;
  registros: RegistroType[];
};

const DashBoard = () => {
  const [registrosAllNos, setRegistrosAllnos] = useState<RegistrosUmNo[]>([]);

  useEffect(() => {
    getAllNosData(setRegistrosAllnos);
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
  console.log("oi");
  console.log(registrosAllNos);
  console.log(registrosAllNos.toString());
  return (
    <div>
      <h1>This is the DashBoard page</h1>
      <div style={{ width: 700 }}>
        {registrosAllNos.length > 0 && (
          <MultipleLineChart
            nos={registrosAllNos.map((registrosNo) => {
              const dataset: RegistrosUmaVariavel = {
                noId: registrosNo.noId,
                valores: registrosNo.registros.map((resgistro) => {
                  return resgistro.temperatura;
                }),
              };
              return dataset;
            })}
            title={"temperatura"}
          />
        )}

        {registrosAllNos.length.toString()}
      </div>
      <ul>
        <li className="cabecalho">
          <div>id</div>
          <div>amonia</div>
          <div>luminosidade</div>
          <div>temperatura</div>
          <div>umidade</div>
          <div>timestamp</div>
        </li>
        {registrosAllNos.map((no) => (
          <li className="registroInfo">
            <div>{no.noId}</div>
            {/* {no.registros.map((registro) => {
              return (
                <div>
                  <div>{registro.id}</div>
                  <div>{registro.amonia}</div>
                  <div>{registro.luminosidade}</div>
                  <div>{registro.temperatura}</div>
                  <div>{registro.umidade}</div>
                  <div>{registro.timestamp.toString()}</div>
                </div>
              );
            })} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoard;
