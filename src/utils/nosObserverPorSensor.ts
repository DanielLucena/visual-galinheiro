// import { DocumentData, Query, QuerySnapshot, Unsubscribe, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
// import { db } from "./firebase";
// import {nosRatreados} from './staticConfig';

// import { RegistroType, RegistrosPorSensor } from "./resgistroTypes";


// const NosRef = collection(db, "No");

// export const nosObserverPorSensor =  (state: RegistrosPorSensor,callback:React.Dispatch<React.SetStateAction<RegistrosPorSensor>>) => {
//     // const registroPorSensores:ResgistrosPorSensor={
//     //     temperatura : [],
//     //      umidade: [],
//     //      amonia: [],
//     //      luminosidade: [],
//     //  }
//     let unsubListenerFunctions: Unsubscribe[] = [];
//     for(const no of nosRatreados){
//         const querie: Query<DocumentData> =  query(
//                 NosRef,
//                 where("id", "==", no),
//                 orderBy("timestamp", "desc"),
//                 limit(1)
//               );

//               const unsubscribre = onSnapshot(
//                 querie as Query<QuerySnapshot<DocumentData>>,
//                 (snapshot) => {
//                     snapshot.docs.forEach((doc) => {
//                     const temp = doc.data() as unknown;
//                     const data = temp as RegistroType;
                    
//                     const registro: RegistroType = {
//                       id: data.id,
//                       amonia: data.amonia,
//                       luminosidade: data.luminosidade,
//                       temperatura: data.temperatura,
//                       umidade: data.umidade,
//                       timestamp: data.timestamp,
//                     };
//                     // state.timestamp
//                     // .forEach((no) => {
//                     //     if(registro.id === no.id)
//                     // });
//                     // callback(state.map((no) =>{
//                     //     if(registro.id === no.id && registro.timestamp !== no.timestamp){
//                     //         console.log("update")
//                     //         return {}
                            
//                     //     }
//                     //         return no
//                     // }
//                     // ) )
//                     //AllNosRegistros.push(registro);
//                   });
                  
//                 });
              
//               unsubListenerFunctions.push(unsubscribre)
               
    
//     //callback(AllNosRegistros);
    
//     }
// }