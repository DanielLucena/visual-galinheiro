import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import RegistrosContext from "../../context/registrosContext";

const Login = () => {
  let navigate = useNavigate();
  const { userLogout } = useContext(RegistrosContext);
  const [user, _loading] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, _loading]);

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join today!</h2>

      <div className="py-4">
        <button
          onClick={() => {
            auth.signOut();
            userLogout();
          }}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <GoogleIcon />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Login;
