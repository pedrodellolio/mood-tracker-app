import "./index.css";
// import "@fontsource-variable/public-sans";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/home.tsx";
import AuthLayout from "./routes/layouts/auth.tsx";
import Login from "./routes/login.tsx";
import RootLayout from "./routes/layouts/root.tsx";
import AnonymousLayout from "./routes/layouts/anonymous.tsx";

const root = document.getElementById("root")!;
createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<AnonymousLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
