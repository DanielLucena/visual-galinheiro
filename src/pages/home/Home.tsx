import { Container } from "@mui/material";
import StatusBar from "../../components/StatusBar/StatusBar";

export default function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Container maxWidth="lg">
        <StatusBar />
      </Container>
    </div>
  );
}
