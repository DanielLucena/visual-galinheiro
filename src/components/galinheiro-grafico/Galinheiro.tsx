import "./galinheiro.css";
import Rainbow from "rainbowvis.js";

export type No = {
  zona: number;
  temp: number;
  umid: number;
  lumi: number;
  amon: number;
};

export type Registro = {
  galinheiro_id: number;
  timestamp: number;
  nos: No[];
};
export type GalinheiroProps = {
  registro: Registro;
};
export default function Galinheiro(props: GalinheiroProps) {
  //let cor = "#ddd";
  let rainbow = new Rainbow();
  const rangeMin = 20;
  const rangeMax = 40;
  rainbow.setNumberRange(rangeMin, rangeMax);
  rainbow.setSpectrum("blue", "green", "yellow", "orange", "red");
  function renderZonas(registro: Registro) {
    let nos = registro.nos;
    let alturaZona = 100 / nos.length;
    let alturacss = alturaZona + "%";
    const zonas = nos.map((element) => {
      let s = "";
      let hexColor = rainbow.colorAt(element.temp);
      s += "#" + hexColor;
      console.log(element.temp + " " + s);
      return (
        <div
          className="zona"
          key={element.zona}
          style={{ backgroundColor: s, height: alturacss }}
        >
          <p> {element.temp + "°C"}</p>
        </div>
      );
    });
    return zonas;
  }

  return (
    <div className="container">
      <div className="galinheiro">{renderZonas(props.registro)}</div>
    </div>
  );
}
