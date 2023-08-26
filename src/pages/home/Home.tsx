import { Box, Container, Typography } from "@mui/material";
import StatusBar from "../../components/StatusBar/StatusBar";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
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
      <Container maxWidth="lg">
        <Box paddingTop={5}>
          <Typography variant="h4">Home</Typography>
        </Box>

        {user && <StatusBar />}
      </Container>
    </div>
  );
}
