import "./monitoring.css";
import { GalinheiroStory } from "../../components/galinheiro-grafico/Galinheiro.stories";

export default function Monitoring() {
  return (
    <div>
      <h1>This is the Monitoring page</h1>
      <div className="content">
        <GalinheiroStory />
      </div>
    </div>
  );
}
