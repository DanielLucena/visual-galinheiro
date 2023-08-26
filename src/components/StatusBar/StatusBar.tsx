import { useContext, useEffect, useState } from "react";
import { getLastUpdate } from "../../utils/getLastUpdate";
import "./statusBar.css";
import CircleIcon from "@mui/icons-material/Circle";
import { green, red, yellow } from "@mui/material/colors";
import { Paper, Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
import { nosRatreados } from "../../utils/staticConfig";

import RegistrosContext from "../../context/registrosContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

export default function StatusBar() {
  const [user, loading] = useAuthState(auth);
  // const navigate = useNavigate();
  const {
    nosLastUpdate,
    setNosLastUpdate,
    initialDataLoaded,
    setInitialDataLoaded,
  } = useContext(RegistrosContext);
  //const [nos, setNos] = useState<RegistroType[]>([]);
  //const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  // const [newRegistro, setNewRegistro] = useState<RegistroType>({
  //   id: 0,
  //   temperatura: 0,
  //   umidade: 0,
  //   amonia: 0,
  //   luminosidade: 0,
  //   timestamp: "",
  // });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLastUpdate();
      setNosLastUpdate(data);
      setInitialDataLoaded(true);
    };
    if (!initialDataLoaded && user) {
      fetchData();
    }
  }, [user, loading]);

  // useEffect(() => {
  //   if (initialDataLoaded) {
  //     observerLastUpdate(setNewRegistro);
  //   }
  // }, [initialDataLoaded]);

  // useEffect(() => {
  //   atualizarNo(newRegistro);
  // }, [newRegistro]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // const atualizarNo = (registro: RegistroType) => {
  //   setNosLastUpdate(
  //     nosLastUpdate.map((no) => {
  //       if (registro.id === no.id && registro.timestamp !== no.timestamp) {
  //         console.log("update no:", no.id);
  //         return registro;
  //       }
  //       return no;
  //     })
  //   );
  // };

  const transformHora = (data: Date) => {
    let hora = (data.getHours() < 10 ? "0" : "") + data.getHours();
    let minuto = (data.getMinutes() < 10 ? "0" : "") + data.getMinutes();
    let segundo = (data.getSeconds() < 10 ? "0" : "") + data.getSeconds();
    return hora + ":" + minuto + ":" + segundo;
  };

  const transformData = (data: Date) => {
    let dia = (data.getDate() < 10 ? "0" : "") + data.getDate();
    let mes = (data.getMonth() < 10 ? "0" : "") + data.getMonth();
    let ano = (data.getFullYear() < 10 ? "0" : "") + data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  };
  // console.log(new Date());
  // console.log(new Date());
  if (!initialDataLoaded) {
    return (
      <>
        <Typography>
          {transformHora(now) + ", " + transformData(now)}
        </Typography>
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
      <Typography variant="body1">
        {transformHora(now) + ", " + transformData(now)}
      </Typography>
      {nosLastUpdate.length > 0 && (
        <div className="bar">
          {nosLastUpdate.map((no) => {
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
                    if (now.valueOf() - horario.valueOf() < 60000) {
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
                {horario.getDate() === now.getDate() &&
                horario.getMonth() === now.getMonth() ? (
                  <>
                    <Typography>
                      {horario.toLocaleTimeString() + ", "}
                    </Typography>
                    <Typography>{"hoje"}</Typography>
                  </>
                ) : (
                  <>
                    <Typography>{transformHora(horario) + ", "}</Typography>
                    <Typography>{transformData(horario)}</Typography>
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
