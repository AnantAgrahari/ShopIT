import Header from "./components/layout/Header";
import Footer from "./components/Footer";
import {Route,Routes,Router} from "react-router-dom";

import "./App.css";
import {Toaster} from "react-hot-toast";
import useUserRoutes from "./components/routes/userRoutes";

function App() {

  const userRoutes=useUserRoutes();
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center"/>
      <Header/>

     <div className="container">
     <Routes>                                     
     {userRoutes}
     </Routes>
     </div>

      <Footer/>
    </div>
    </Router>
  );
}

export default App;
