import type { Story } from "@ladle/react";
import Galinheiro, { Registro, No } from "./Galinheiro.tsx";
import { RegistroContext } from "./RegistroContext.tsx";
import React, { useMemo, useState } from "react";
const db: Registro = {
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
};
const [registro, setRegistro] = useState(db);
const RegistroProviderValue = useMemo(
  () => ({ registro, setRegistro }),
  [registro, setRegistro]
);

export const WelcomeStory: Story = () => {
  return (
    <>
      <RegistroContext.Provider value={RegistroProviderValue}>
        <Galinheiro registro={registro} />
      </RegistroContext.Provider>
    </>
  );
};
