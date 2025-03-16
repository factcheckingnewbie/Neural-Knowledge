import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "@/pages/index";
import GraphPage from "@/pages/graph";
import TreePage from "@/pages/tree";
import NodesPage from "@/pages/nodes";
import SettingsPage from "@/pages/settings";
import ManualPage from "@/pages/manual";
import VideoGeneratorPage from "@/pages/video-generator";
import "@/index.css";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><Index /></AppLayout>} />
        <Route path="/graph" element={<AppLayout><GraphPage /></AppLayout>} />
        <Route path="/tree" element={<AppLayout><TreePage /></AppLayout>} />
        <Route path="/nodes" element={<AppLayout><NodesPage /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
        <Route path="/manual" element={<AppLayout><ManualPage /></AppLayout>} />
        <Route path="/video-generator" element={<AppLayout><VideoGeneratorPage /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Main />);
