import { useEffect, useState } from "react";
import { RegistroType } from "../../utils/resgistroTypes";
import { getLastUpdate } from "../../utils/getLastUpdate";
import { observerLastUpdate } from "../../utils/observerLastUpdate";
import "./statusBar.css";
import CircleIcon from "@mui/icons-material/Circle";
import { green, red, yellow } from "@mui/material/colors";
import { Paper, Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/material";
import { nosRatreados } from "../../utils/staticConfig";

export default function StatusBar() {
  const [nos, setNos] = useState<RegistroType[]>([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [newRegistro, setNewRegistro] = useState<RegistroType>({
    id: 0,
    temperatura: 0,
    umidade: 0,
    amonia: 0,
    luminosidade: 0,
    timestamp: "",
  });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLastUpdate();
      console.log("get", data);
      setNos(data);
      setInitialDataLoaded(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialDataLoaded) {
      observerLastUpdate(setNewRegistro);
    }
  }, [initialDataLoaded]);

  useEffect(() => {
    atualizarNo(newRegistro);
  }, [newRegistro]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const atualizarNo = (registro: RegistroType) => {
    setNos(
      nos.map((no) => {
        if (registro.id === no.id && registro.timestamp !== no.timestamp) {
          console.log("update no:", no.id);
          return registro;
        }
        return no;
      })
    );
  };

  // console.log(new Date());
  // console.log(new Date());
  if (!initialDataLoaded) {
    return (
      <>
        <Typography>time now: {now.toString()}</Typography>
        <div className="bar">
          {nosRatreados.map((no) => {
            return (
              <Paper elevation={3} key={no} className="no-display">
                <Typography variant="h5">
                  <Skeleton />
                </Typography>

                <div className="connection-line">
                  <>
                    <Skeleton variant="circular" height={"1em"} width={"1em"} />

                    <Skeleton width="80%" />
                  </>
                </div>

                <>
                  <Typography>
                    <Skeleton />
                  </Typography>
                  <Typography>
                    <Skeleton />
                  </Typography>
                </>
              </Paper>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      {/* <h1>bar</h1> */}
      <Typography>time now: {now.toString()}</Typography>
      {nos.length > 0 && (
        <div className="bar">
          {nos.map((no) => {
            const horario = new Date(no.timestamp);
            //const now = new Date();
            return (
              <Paper elevation={3} key={no.id} className="no-display">
                <Typography variant="h5">{"Hub" + no.id.toString()}</Typography>

                {/* <Typography>
                  
                  {horario.toString()}
                </Typography>
                <Typography>{now.toString()}</Typography> */}

                <div className="connection-line">
                  {(() => {
                    if (now.valueOf() - horario.valueOf() < 30000) {
                      return (
                        <>
                          <CircleIcon sx={{ color: green["A700"] }} />
                          <Typography>Online</Typography>
                        </>
                      );
                    } else if (now.valueOf() - horario.valueOf() < 120000) {
                      return (
                        <>
                          <CircleIcon sx={{ color: yellow["A700"] }} />
                          <Typography>Atrasado</Typography>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <CircleIcon sx={{ color: red["A700"] }} />
                          <Typography>Offline</Typography>
                        </>
                      );
                    }
                  })()}
                </div>
                {/* <Typography>atualizado: </Typography> */}
                {horario.getDate() === now.getDate() ? (
                  <>
                    <Typography>
                      {horario.toTimeString().split(" ", 1) + ","}
                    </Typography>
                    <Typography>{"hoje"}</Typography>
                  </>
                ) : (
                  <>
                    <Typography>
                      {horario.toTimeString().split(" ", 1) + ","}
                    </Typography>
                    <Typography>
                      {horario.toLocaleDateString().substring(0, 5)}
                    </Typography>
                  </>
                )}
              </Paper>
            );
          })}
        </div>
      )}
    </>
  );
}
