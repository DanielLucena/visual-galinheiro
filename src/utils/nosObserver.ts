import { DocumentData, Query, QuerySnapshot, Unsubscribe, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import {nosRatreados} from './staticConfig';
import { RegistroType } from "./resgistroTypes";

const NosRef = collection(db, "No");

export type RegistrosUmNo={
    noId:number;
    registros: RegistroType[];
}


// const queries: Query<DocumentData>[] = nosRatreados.map((no)=> {
//     return query(
//         NosRef,
//         where("id", "==", no),
//         orderBy("timestamp", "desc"),
//         limit(10)
//       );
// })

export async function getAllNosData(callback:React.Dispatch<React.SetStateAction<RegistrosUmNo[]>>){
    let AllNosRegistros: Array<RegistrosUmNo> = [];
    let unsubListenerFunctions: Unsubscribe[] = [];
    nosRatreados.forEach((no)=>{
        const querie: Query<DocumentData> =  query(
                NosRef,
                where("id", "==", no),
                orderBy("timestamp", "desc"),
                limit(5)
              );
        
    const unsubscribre = onSnapshot(
            querie as Query<QuerySnapshot<DocumentData>>,
            (snapshot) => {
              const registros: RegistroType[] = [];
              snapshot.docs.forEach((doc) => {
                const temp = doc.data() as unknown;
                const data = temp as RegistroType;
                const registro: RegistroType = {
                  id: data.id,
                  amonia: data.amonia,
                  luminosidade: data.luminosidade,
                  temperatura: data.temperatura,
                  umidade: data.umidade,
                  timestamp: data.timestamp,
                };
                registros.push(registro);
              });
              AllNosRegistros.push({noId:no,
            registros:registros})
            }
          );
          unsubListenerFunctions.push(unsubscribre)
    })
    //  console.log("fun");
    //  console.log(typeof AllNosRegistros);
    //  console.log(AllNosRegistros.length);
    
    await callback(AllNosRegistros);
    
}