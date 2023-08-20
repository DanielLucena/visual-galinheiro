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
import { RegistrosUmaVariavel } from "../../utils/resgistroTypes";
import { useEffect, useState } from "react";

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

export type multipleLineChartProps = {
  nos: RegistrosUmaVariavel;
  title: string;
};
export default function MultipleLineChart(props: multipleLineChartProps) {
  console.log("props", props);
  //   const [state, setState] = useState<{
  //     labels: string[];
  //     datasets: RegistrosUmaVariavel[];
  //   } | null>(null);
  //   useEffect(() => {
  //     //console.log("effect", props.nos[0].valores);
  //     // const temp = [
  //     //   ...props.nos.map((no) => {
  //     //     return {
  //     //       label: no.noId.toString(),
  //     //       data: [...no.valores],
  //     //     };
  //     //   }),
  //     // ];
  //     setState({
  //       labels: ["1", "2", "3", "4", "5"],
  //       datasets: [{ ...props.nos }],
  //     });
  //   }, [props.nos]);
  console.log("chart", props);

  var data = {
    labels: ["1", "2", "3", "4"],
    datasets: [{ ...props.nos }],
  };

  //const [statekey, setStatekey] = useState(0);

  // let lista: string[] = [];
  //   console.log("valores lenght", props?.nos[0]?.valores?.length);
  //   const tam = props?.nos[0]?.valores?.length;
  //   for (let i = 1; i < tam + 1; i++) {
  //     lista.push(i.toString());
  //   }
  //   console.log("lista", lista);
  //   const datasets = [];
  //   for (let i = 0; i < props?.nos?.length; i++) {
  //     let dataset = {
  //       label: props?.nos[i]?.noId?.toString(),
  //       data: props?.nos[i]?.valores,
  //     };
  //     datasets.push(dataset);
  //   }
  //   console.log("datasets", datasets);
  //   const labels = lista;
  //   const data = {
  //     labels,
  //     datasets,
  //   };
  //   setState(data);

  //useEffect(() => {
  // let lista: string[] = [];
  // //console.log("valores lenght", props?.nos[0]?.valores?.length);
  // const tam = props?.nos[0]?.valores?.length;
  // for (let i = 1; i < tam + 1; i++) {
  //   lista.push(i.toString());
  // }
  // console.log("lista", lista);
  // const datasets = [];
  // for (let i = 0; i < props?.nos?.length; i++) {
  //   let dataset = {
  //     label: props?.nos[i]?.noId?.toString(),
  //     data: props?.nos[i]?.valores,
  //   };
  //   datasets.push(dataset);
  // }
  // console.log("datasets", datasets);
  // const labels = lista;
  // const data = {
  //   labels,
  //   datasets,
  // };

  // console.log("props", props.nos[0].valores.length);
  //  console.log("state 1", state.datasets[0].data.length);

  // setState({
  //   labels: ["1", "2", "3", "4", "5"],
  //   datasets: [
  //     ...props!.nos!.map((no) => {
  //       return {
  //         label: no!.noId!.toString(),
  //         data: [...no!.valores],
  //       };
  //     }),
  //   ],
  // });

  //console.log("state 2", state.datasets[0].data.length);
  // return () => {
  //   setState({
  //     labels: ["", "1"],
  //     datasets: [
  //       {
  //         label: " ",
  //         data: [1, 2],
  //       },
  //     ],
  //   });
  // };
  // }, [props.nos]);

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
  // console.log("state", state);
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
