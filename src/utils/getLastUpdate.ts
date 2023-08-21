import { DocumentData, Query, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import {nosRatreados} from './staticConfig';
import { RegistroType } from "../utils/resgistroTypes";

const NosRef = collection(db, "No");

export const getLastUpdate = async () => {
    //let unsubListenerFunctions: Unsubscribe[] = [];
    let AllNosRegistros: RegistroType[] = [];
    for(const no of nosRatreados){
        const querie: Query<DocumentData> =  query(
                NosRef,
                where("id", "==", no),
                orderBy("timestamp", "desc"),
                limit(1)
              );

                const res = await getDocs(querie);
                res.forEach((doc) => {
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
                    AllNosRegistros.push(registro);
                  });
                  
                }
              
              //unsubListenerFunctions.push(unsubscribre)
               
    
    //callback(AllNosRegistros);
    return AllNosRegistros;
}