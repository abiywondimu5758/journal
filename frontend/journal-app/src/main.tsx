import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </BrowserRouter>
  
);
