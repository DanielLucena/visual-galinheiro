import React from "react";
import { GalinheiroProps, Registro } from "./Galinheiro";
import MySlider from "./MySlider";

export default function SliderBox(props: GalinheiroProps) {
  function renderSliders(registro: Registro) {
    let nos = registro.nos;
    const sliders = nos.map((element) => {
      const valor = element.temp - rangeMin;
      const range = rangeMax - rangeMin;
      return <MySlider valor={valor} range={range} />;
    });
    return <div>{sliders}</div>;
  }
  return <div>{renderSliders(props.registro)}</div>;
}
