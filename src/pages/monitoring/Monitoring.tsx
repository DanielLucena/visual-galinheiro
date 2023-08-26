import "./monitoring.css";
import { GalinheiroStory } from "../../components/galinheiro-grafico/Galinheiro.stories";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Monitoring() {
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      if (!user) return navigate("/login");
    };

    fetchData();
  }, [user, loading]);
  return (
    <div>
      <h1>This is the Monitoring page</h1>
      <div className="content">
        <GalinheiroStory />
      </div>
    </div>
  );
}
