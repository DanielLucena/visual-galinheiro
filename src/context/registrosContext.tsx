import { createContext, Dispatch, useEffect, useState } from "react";
import { RegistroType, RegistrosUmNo } from "../utils/resgistroTypes";
import { observerLastUpdate } from "../utils/observerLastUpdate";
import { Unsubscribe } from "firebase/firestore";
//export const ItemsListContext = createContext(0);

//const [registrosAllNos, setRegistrosAllnos] = useState<RegistrosUmNo[]>([]);

const emptyRegistro: RegistroType = {
  id: 0,
  temperatura: 0,
  umidade: 0,
  amonia: 0,
  luminosidade: 0,
  timestamp: "",
};

export type RegistrosContextType = {
  registrosAllNos: RegistrosUmNo[];
  setRegistrosAllNos: Dispatch<React.SetStateAction<RegistrosUmNo[]>>;
  bigDataLoaded: boolean;
  setBigDataLoaded: Dispatch<React.SetStateAction<boolean>>;
  initialDataLoaded: boolean;
  setInitialDataLoaded: Dispatch<React.SetStateAction<boolean>>;
  nosLastUpdate: RegistroType[];
  setNosLastUpdate: Dispatch<React.SetStateAction<RegistroType[]>>;
  userLogout: () => void;
};

export const RegistrosContext = createContext<RegistrosContextType>(
  {} as RegistrosContextType
);

export const RegistrosProvider = (props: React.PropsWithChildren) => {
  const [registrosAllNos, setRegistrosAllNos] = useState<RegistrosUmNo[]>([]);
  const [bigDataLoaded, setBigDataLoaded] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [nosLastUpdate, setNosLastUpdate] = useState<RegistroType[]>([]);
  const [newRegistro, setNewRegistro] = useState<RegistroType>(emptyRegistro);
  const [unsubListenerFunctions, setUnsubListenerFunctions] = useState<
    Unsubscribe[]
  >([]);

  useEffect(() => {
    if (initialDataLoaded) {
      let unsubList = observerLastUpdate(setNewRegistro);
      setUnsubListenerFunctions(unsubList);
    }
  }, [initialDataLoaded]);

  useEffect(() => {
    atualizarNo(newRegistro);
  }, [newRegistro]);

  const atualizarNo = (registro: RegistroType) => {
    setNosLastUpdate(
      nosLastUpdate.map((no) => {
        if (registro.id === no.id && registro.timestamp !== no.timestamp) {
          //console.log("update statusBar no:", no.id);
          return registro;
        }
        return no;
      })
    );
    if (bigDataLoaded) {
      setRegistrosAllNos(
        registrosAllNos.map((no) => {
          if (
            registro.id === no.noId &&
            registro.timestamp !==
              no.registros[no.registros.length - 1].timestamp
          ) {
            //console.log("update complexo no: ", no.noId);
            const newRegistros = no.registros;
            newRegistros.shift();
            newRegistros.push(registro);
            return { ...no, registros: newRegistros };
          }
          return no;
        })
      );
    }
  };
  const userLogout = () => {
    console.log("user logout");
    unsubListenerFunctions.forEach((unsubscribe) => {
      unsubscribe();
    });
    setBigDataLoaded(false);
    setInitialDataLoaded(false);
    setNewRegistro(emptyRegistro);
  };

  return (
    <RegistrosContext.Provider
      value={{
        registrosAllNos,
        setRegistrosAllNos,
        bigDataLoaded,
        setBigDataLoaded,
        initialDataLoaded,
        setInitialDataLoaded,
        nosLastUpdate,
        setNosLastUpdate,
        userLogout,
      }}
    >
      {props.children}
    </RegistrosContext.Provider>
  );
};

export default RegistrosContext;
