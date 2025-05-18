import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import GroupsView from "./GroupsView";

function App() {
  return (<Box>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<GroupsView />} />
      </Routes>
    </BrowserRouter>
  </Box >);
}


export default App
