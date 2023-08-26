import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import "./login.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  let navigate = useNavigate();
  const [user, _loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Container maxWidth="lg">
        <div className="page">
          <Paper elevation={12}>
            <div className="box">
              <Typography variant="h5">Bem vindo!</Typography>

              <Button
                onClick={GoogleLogin}
                variant="outlined"
                startIcon={<FcGoogle />}
                size="large"
              >
                <div className="button">Join with google</div>
              </Button>
            </div>
          </Paper>
        </div>
      </Container>
    </>
  );
};

export default Login;
