import type { Story } from "@ladle/react";
import Galinheiro, { Registro } from "./Galinheiro.tsx";

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
      zona: 4,
      temp: 25,
      umid: 90,
      lumi: 40,
      amon: 10,
    },
    {
      zona: 5,
      temp: 28,
      umid: 90,
      lumi: 40,
      amon: 10,
    },
  ],
};

export const GalinheiroStory: Story = () => {
  return (
    <>
      <Galinheiro registro={db} />
    </>
  );
};
