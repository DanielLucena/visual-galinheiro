import { createContext, Dispatch } from "react";
import { No, Registro } from "./Galinheiro";

type RegistroContextType = {
  registro: Registro;
  setRegistro: Dispatch<Registro>;
};

export const RegistroContext = createContext<RegistroContextType>({
  registro: {
    galinheiro_id: 1,
    timestamp: 10,
    nos: [
      {
        zona: 1,
        temp: 35,
        umid: 90,
        lumi: 40,
        amon: 10,
      },
      {
        zona: 2,
        temp: 43,
        umid: 90,
        lumi: 40,
        amon: 10,
      },
      {
        zona: 3,
        temp: 21,
        umid: 90,
        lumi: 40,
        amon: 10,
      },
      {
        zona: 3,
        temp: 25,
        umid: 90,
        lumi: 40,
        amon: 10,
      },
      {
        zona: 3,
        temp: 28,
        umid: 90,
        lumi: 40,
        amon: 10,
      },
    ],
  },
  setRegistro: (v) => {},
});
