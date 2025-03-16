import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./pages";
import GraphPage from "./pages/graph";
import TreePage from "./pages/tree";
import NodesPage from "./pages/nodes";
import SettingsPage from "./pages/settings";
import ManualPage from "./pages/manual";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/graph' element={<GraphPage />} />
      <Route path='/tree' element={<TreePage />} />
      <Route path='/nodes' element={<NodesPage />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='/manual' element={<ManualPage />} />
    </Routes>
  </BrowserRouter>
);