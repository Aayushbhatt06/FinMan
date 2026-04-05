import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Dashboard />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
