import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLDivElement
);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
