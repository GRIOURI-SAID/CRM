import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router/index";
import ProtectedRouter from './router/protectedRoute'

function App() {
  const { alphaToken } = localStorage

  return (
    <RecoilRoot>
      <BrowserRouter>
        {alphaToken && alphaToken.length ? <Router /> : <ProtectedRouter />}
        <ScrollToTop />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
