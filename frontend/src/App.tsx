import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import GroupsView from "./GroupsView";
import GroupView from "./GroupView";


function App() {
  return (<Box>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<GroupsView />} />
        <Route path="group/:groupId"
          element={<GroupView />} />
      </Routes>
    </BrowserRouter>
  </Box >);
}


export default App
