import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import Groups from "./Groups";

function App() {
  return (<Box>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<Groups />} />
      </Routes>
    </BrowserRouter>
  </Box >);
}


export default App
