import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout />
    </BrowserRouter>
  );
}
export default App;