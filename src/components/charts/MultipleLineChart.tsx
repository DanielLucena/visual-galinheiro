import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Colors } from "chart.js";

ChartJS.register(Colors);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type RegistrosUmaVariavel = {
  noId: number;
  valores: number[];
};

export type multipleLineChartProps = {
  nos: RegistrosUmaVariavel[];
  title: string;
};
export default function MultipleLineChart(props: multipleLineChartProps) {
  console.log("chart");
  console.log(props);
  const options = {
    responsive: true,

    events: [],
    animation: {
      duration: 0,
    },

    responsiveAnimationDuration: 0,
    plugins: {
      colors: { forceOverride: true },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };
  let lista: string[] = [];
  for (let i = 1; i < props.nos[0].valores.length + 1; i++) {
    lista.push(i.toString());
  }
  const datasets = [];
  for (let i = 0; i < props.nos.length; i++) {
    let dataset = {
      label: props.nos[i].noId.toString(),
      data: props.nos[i].valores,
    };
    datasets.push(dataset);
  }
  const labels = lista;
  const data = {
    labels,
    datasets,
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
