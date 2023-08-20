import { DocumentData, Query, QuerySnapshot, Unsubscribe, collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import {nosRatreados} from './staticConfig';
import { RegistroType } from "../pages/dashboard/DashBoard";
import { RegistrosUmaVariavel } from "../components/charts/MultipleLineChart";
const NosRef = collection(db, "No");


export type RegistrosUmNo={
    noId:number;
    registros: RegistroType[];
}



export const nosGetData = async () => {
    const AllNosRegistros: RegistrosUmNo[] = [];
    
    nosRatreados.forEach(async (no)=>{
        const querie: Query<DocumentData> =  query(
                NosRef,
                where("id", "==", no),
                orderBy("timestamp", "desc"),
                limit(5)
              );
              const registros: RegistroType[] = [];
              const res = await getDocs(querie);
              res.forEach((doc) =>{
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
                registros:registros.reverse()})
    
});
    // console.log(AllNosRegistros);
    // console.log(AllNosRegistros.length)
    return AllNosRegistros;
}


export async function getOnlyTemp(registrosAllNos:RegistrosUmNo[]):Promise<RegistrosUmaVariavel[]>{
    console.log("fun1",registrosAllNos);
    console.log("fun1 length",registrosAllNos.length);
    //const datasets:RegistrosUmaVariavel[] = [];
    const datasets:RegistrosUmaVariavel[] = [];
    for(const no of registrosAllNos){
        console.log("no");
        const valoresArr:number[] = no.registros.map((registros)=>{
            return registros.temperatura;
         })
        const registrosUmaVariavel:RegistrosUmaVariavel={
            noId: no.noId,
            valores: valoresArr}
                 
                 datasets.push(registrosUmaVariavel);
        };
    
    //  = await Promise.all(registrosAllNos.map(async (registrosNo) => {
    //     return{
    //         noId: registrosNo.noId,
    //         valores: [1,2,3]
    //         // registrosNo.registros.map((registros)=>{
    //         //     return registros.temperatura;
    //         // })
    //     }
    //   }))
      console.log("fun2", datasets);
      return datasets;

}