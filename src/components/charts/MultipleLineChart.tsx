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
// import { useEffect, useState } from "react";
import "./multipleLineChart.css";
import { Skeleton, Stack, Typography } from "@mui/material";
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
  nos: RegistrosUmaVariavel[];
  title: string;
  unit: string;
  initialTime: Date;
};
export default function MultipleLineChart(props: multipleLineChartProps) {
  //console.log("props", props);
  // const [state, setState] = useState<{
  //   labels: string[];
  //   datasets: RegistrosUmaVariavel[];
  // } | null>(null);
  // useEffect(() => {
  //   //console.log("effect", props.nos[0].valores);
  //   // const temp = [
  //   //   ...props.nos.map((no) => {
  //   //     return {
  //   //       label: no.noId.toString(),
  //   //       data: [...no.valores],
  //   //     };
  //   //   }),
  //   // ];
  //   console.log("effect");
  //   setState({
  //     labels: ["1", "2", "3", "4", "5"],
  //     datasets: props.nos,
  //   });
  // }, [props.nos]);
  //console.log("chart", props);
  const [labels, setLabels] = useState<string[]>([]);
  //const [initialTime, setInitialTime] = useState<Date>(new Date());
  useEffect(() => {
    console.log("recalc labels");

    let internal: string[] = [];
    let min = props.initialTime.getMinutes();
    for (let i = 0; i < props?.nos[0]?.data.length; i++) {
      internal.push(((min + i) % 60).toString());
    }
    setLabels(internal);
  }, [props.initialTime]);

  //var labels: string[] = [];

  //let initialTime = new Date(props?.times[0]?.data[0]);
  //console.log("min ", initialTime.getMinutes());

  // for (let i = 0; i < props?.nos[0]?.data.length; i++) {
  //   labels.push((initialTime.getMinutes() + i).toString());
  // }
  //console.log("labels", labels);

  var data = {
    // labels: props?.times[0]?.data,
    labels: labels,
    datasets: props?.nos?.map((no) => {
      return {
        ...no,
      };
    }),
  };
  //console.log(`${props.title} datasets lenght`, data.datasets.length);

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

  // const totalDuration = 10000;
  // const delayBetweenPoints = totalDuration / data.datasets[0].data.length;
  // const previousY = (ctx: any) =>
  //   ctx.index === 0
  //     ? ctx.chart.scales.y.getPixelForValue(100)
  //     : ctx.chart
  //         .getDatasetMeta(ctx.datasetIndex)
  //         .data[ctx.index - 1].getProps(["y"], true).y;
  // const animation = {
  //   x: {
  //     type: "number",
  //     easing: "linear",
  //     duration: delayBetweenPoints,
  //     from: NaN, // the point is initially skipped
  //     delay(ctx: { type: string; xStarted: boolean; index: number }) {
  //       if (ctx.type !== "data" || ctx.xStarted) {
  //         return 0;
  //       }
  //       ctx.xStarted = true;
  //       return ctx.index * delayBetweenPoints;
  //     },
  //   },
  //   y: {
  //     type: "number",
  //     easing: "linear",
  //     duration: delayBetweenPoints,
  //     from: previousY,
  //     delay(ctx: { type: string; yStarted: boolean; index: number }) {
  //       if (ctx.type !== "data" || ctx.yStarted) {
  //         return 0;
  //       }
  //       ctx.yStarted = true;
  //       return ctx.index * delayBetweenPoints;
  //     },
  //   },
  // };

  const options = {
    // animation,
    responsive: true,
    // events: [],
    animation: {
      duration: 1,
    },
    responsiveAnimationDuration: 0,

    plugins: {
      tooltip: {
        callbacks: {
          // label: (item: any) => {
          //   console.log(item);
          // },
          label: (item: any) =>
            `${item.dataset.label}: ${item.formattedValue}${props.unit}`,
        },
      },
      colors: { forceOverride: true },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: `${props.title} (${props.unit})`,
        },
      },
      x: {
        title: {
          display: true,
          text: `Por Minuto, apartir de: ${props.initialTime.toLocaleTimeString()}`,
        },

        ticks: {
          // autoSkip: true,
          maxTicksLimit: 12,
          // callback: (value: string, index: any, values: any) => {
          //   return new Date(value).getMinutes();
          // },
        },
      },
    },
    elements: {
      point: {
        radius: 1.5,
      },
    },
  };
  //console.log("state", state);
  return (
    <>
      {props.nos.length > 0 ? (
        <Line options={options} data={data} />
      ) : (
        <div className="chart-box">
          <Stack>
            <Skeleton variant="text" />

            <Typography>
              <Skeleton />
            </Typography>
            <Skeleton variant="rectangular" height="80%" />
          </Stack>
        </div>
      )}
    </>
  );
}
