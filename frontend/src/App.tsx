import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import GroupsView from "./GroupsView";
import GroupView from "./GroupView";
import NewTransactionView from "./NewTransactionView";


function App() {
  return (<Box>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<GroupsView />} />
        <Route path="group/:groupId"
          element={<GroupView />} />
        <Route path="group/:groupId/newtransaction"
          element={<NewTransactionView />} />
      </Routes>
    </BrowserRouter>
  </Box >);
}


export default App
