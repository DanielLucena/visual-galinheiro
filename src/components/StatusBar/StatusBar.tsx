import { useEffect, useState } from "react";
import { RegistroType } from "../../utils/resgistroTypes";
import { getLastUpdate } from "../../utils/getLastUpdate";
import { observerLastUpdate } from "../../utils/observerLastUpdate";
import "./statusBar.css";
import CircleIcon from "@mui/icons-material/Circle";
import { green, pink, red, yellow } from "@mui/material/colors";

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

  return (
    <>
      <h1>bar</h1>
      <p>time now: {now.toString()}</p>
      {nos.length > 0 && (
        <div className="bar">
          {nos.map((no) => {
            const horario = new Date(no.timestamp);
            //const now = new Date();
            return (
              <div key={no.id}>
                <h1>{no.id}</h1>

                <p>
                  {/* {horario.toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  })} */}
                  {horario.toString()}
                </p>
                <p>{now.toString()}</p>
                <p>
                  {(() => {
                    if (now.valueOf() - horario.valueOf() < 50000) {
                      return <CircleIcon sx={{ color: green[500] }} />;
                    } else if (now.valueOf() - horario.valueOf() < 120000) {
                      return <CircleIcon sx={{ color: yellow[500] }} />;
                    } else {
                      return <CircleIcon sx={{ color: red[500] }} />;
                    }
                  })()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
