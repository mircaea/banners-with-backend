import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "../context/AppContext";
// import Modal from "./modal/Modal";
import Routing from "./Routing";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        {/* <Modal /> */}
        <Routing />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
