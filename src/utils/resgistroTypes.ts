


export type RegistroType = {
    id: number;
    amonia: number;
    luminosidade: number;
    temperatura: number;
    umidade: number;
    timestamp: string;
  };

  export type RegistrosUmNo = {
    noId: number;
    registros: RegistroType[];
  };

  export type RegistrosUmaVariavel = {
    label: string;
    data: number[];
  };


export type ResgistrosPorSensor ={
   temperatura:RegistrosUmaVariavel[];
    umidade:RegistrosUmaVariavel[];
    amonia:RegistrosUmaVariavel[];
    luminosidade:RegistrosUmaVariavel[];
}