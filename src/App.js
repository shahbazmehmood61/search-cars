import { Header, Filter, Items } from "./Components";
import "./App.css";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Header />
      <Container maxWidth="md">
        <Filter />
        <Items />
      </Container>
    </div>
  );
}

export default App;
