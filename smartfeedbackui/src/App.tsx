import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import ToastProvider from "./common/modals/ToastProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <ToastProvider></ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
