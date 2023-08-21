import { DocumentData, Query, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
//import {nosRatreados} from './staticConfig';
import { RegistroType, ResgistrosPorSensor } from "../utils/resgistroTypes";
import { RegistrosUmaVariavel } from "./resgistroTypes"
const NosRef = collection(db, "No");



// export type ResgistrosPorSensor ={
//     sensor:string;
//     no:RegistrosUmaVariavel[];
// }

export const nosGetDataPorSensor = async () => {
    //const AllNosRegistros: RegistrosUmNo[] = [];
    // const registroPorSensores:ResgistrosPorSensor[]=[{sensor:'temperatura',no:[]},{sensor:'umidade',no:[]},{sensor:'amonia',no:[]},{sensor:'luminosidade',no:[]}]
    const registroPorSensores:ResgistrosPorSensor={
        temperatura : [],
         umidade: [],
         amonia: [],
         luminosidade: [],
     }
    const nosRatreados:number[]=[1,2,3,4,5];////
    for(const no of nosRatreados){
        const querie: Query<DocumentData> =  query(
                NosRef,
                where("id", "==", no),
                orderBy("timestamp", "desc"),
                limit(10)
              );
              //const registros: RegistroType[] = [];
              const temperaturas:RegistrosUmaVariavel={label:no.toString(),data:[]}
              const umidades:RegistrosUmaVariavel={label:no.toString(),data:[]}
              const luminosidades:RegistrosUmaVariavel={label:no.toString(),data:[]}
              const amonias:RegistrosUmaVariavel={label:no.toString(),data:[]}
              const res = await getDocs(querie);
              res.forEach( (doc) =>{
                const temp = doc.data() as unknown;
                const data = temp as RegistroType;
                // const registro: RegistroType = {
                //     id: data.id,
                //     amonia: data.amonia,
                //     luminosidade: data.luminosidade,
                //     temperatura: data.temperatura,
                //     umidade: data.umidade,
                //     timestamp: data.timestamp,
                //   };
                //   registros.push(registro);
                temperaturas.data.push(data.temperatura)
                umidades.data.push(data.umidade)
                luminosidades.data.push(data.luminosidade)
                amonias.data.push(data.amonia)
              });
            //   AllNosRegistros.push({noId:no,
            //     registros:registros.reverse()})
            registroPorSensores.temperatura.push(temperaturas);
            registroPorSensores.umidade.push(umidades);
            registroPorSensores.amonia.push(amonias);
            registroPorSensores.luminosidade.push(luminosidades);
            console.log(`fun ${no}`,registroPorSensores);

    
};
    console.log("fun",registroPorSensores);
    
    return registroPorSensores;
}


// export async function getOnlyTemp(registrosAllNos:RegistrosUmNo[]):Promise<RegistrosUmaVariavel[]>{
//     console.log("fun1",registrosAllNos);
//     console.log("fun1 length",registrosAllNos.length);
//     //const datasets:RegistrosUmaVariavel[] = [];
//     const datasets:RegistrosUmaVariavel[] = [];
//     for(const no of registrosAllNos){
//         console.log("no");
//         const valoresArr:number[] = no.registros.map((registros)=>{
//             return registros.temperatura;
//          })
//         const registrosUmaVariavel:RegistrosUmaVariavel={
//             noId: no.noId,
//             valores: valoresArr}
                 
//                  datasets.push(registrosUmaVariavel);
//         };
    
//     //  = await Promise.all(registrosAllNos.map(async (registrosNo) => {
//     //     return{
//     //         noId: registrosNo.noId,
//     //         valores: [1,2,3]
//     //         // registrosNo.registros.map((registros)=>{
//     //         //     return registros.temperatura;
//     //         // })
//     //     }
//     //   }))
//       console.log("fun2", datasets);
//       return datasets;

// }