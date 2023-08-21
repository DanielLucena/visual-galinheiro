import { useEffect, useState } from "react";
import { RegistroType } from "../../utils/resgistroTypes";
import { getLastUpdate } from "../../utils/getLastUpdate";
import { observerLastUpdate } from "../../utils/observerLastUpdate";
import "./statusBar.css";

export default function StatusBar() {
  const [nos, setNos] = useState<RegistroType[]>([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
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
      observerLastUpdate(nos, setNos);
    }
  }, [initialDataLoaded]);

  return (
    <>
      <h1>bar</h1>

      {nos.length > 0 && (
        <div className="bar">
          {nos.map((no) => {
            const horario = new Date(no.timestamp);
            return (
              <div key={no.id}>
                <h1>{no.id}</h1>

                <p>
                  {horario.toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
