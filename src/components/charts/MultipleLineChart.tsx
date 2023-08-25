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

  var labels: string[] = [];

  for (let i = 1; i <= props?.nos[0]?.data.length; i++) {
    labels.push(i.toString());
  }
  //console.log("labels", labels);

  var data = {
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
    // animation: {
    //   duration: 0,
    // },
    responsiveAnimationDuration: 0,

    plugins: {
      // tooltip: {
      //   callbacks: {
      //     label: (item: any) => `${item.label} ºc`,
      //   },
      // },
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
    scale: {
      y: {
        beginAtZero: true,
      },
      x: {
        //type: "time",
        ticks: {
          //autoSkip: true,
          maxTicksLimit: 10,
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
