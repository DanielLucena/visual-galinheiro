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

export async function nosObserver(state:RegistrosUmNo[],callback:React.Dispatch<React.SetStateAction<RegistrosUmNo[]>>){
    //let AllNosRegistros: Array<RegistrosUmNo> = [];
    let unsubListenerFunctions: Unsubscribe[] = [];
    
    for(const no of nosRatreados){
    //nosRatreados.forEach((no)=>{
        const querie: Query<DocumentData> =  query(
                NosRef,
                where("id", "==", no),
                orderBy("timestamp", "desc"),
                limit(1)
              );
        
    const unsubscribre = onSnapshot(
            querie as Query<QuerySnapshot<DocumentData>>,
            (snapshot) => {
              //const registros: RegistroType[] = [];
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
              //   callback(state.map((no) =>{
              //     if(registro.id === no.id && registro.timestamp !== no.timestamp){
              //         console.log("update")
              //         return registro
                      
              //     }
              //         return no
              // }
              // ) );
                callback(state.map((no)=>{
                  if(registro.id === no.noId && registro.timestamp !== no.registros[no.registros.length - 1].timestamp){
                    console.log("update");
                    console.log("state no registros",no.registros);
                    const newRegistros = no.registros
                    console.log("newRegistros",newRegistros);
                    newRegistros.shift();
                    console.log("newRegistros.shift()",newRegistros);
                    newRegistros.push(registro)
                    console.log("newRegistros.push(registro)",newRegistros);
                    return {...no,
                      registros: newRegistros
                    }
                    
                  }
                  return no;
                }));
               // registros.push(registro);
              });
            //   AllNosRegistros.push({noId:no,
            // registros:registros})
            }
          );
          unsubListenerFunctions.push(unsubscribre)
    }
    //)
    //  console.log("fun");
    //  console.log(typeof AllNosRegistros);
    //  console.log(AllNosRegistros.length);
    
    //await callback(AllNosRegistros);
    
}