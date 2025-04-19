import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.jsx";
import { ThemeProvider } from "./contexts/theme-context.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
);
