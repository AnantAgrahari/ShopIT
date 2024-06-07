import Header from "./components/layout/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Routes} from "react-router-dom";

import "./App.css";
import {Toaster} from "react-hot-toast";
import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
function App() {

  const userRoutes=useUserRoutes();
  const adminRoutes=useAdminRoutes();
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center"/>
      <Header/>

     <div className="container">
     <Routes>                                     
     {userRoutes }
     </Routes>
     </div>

      <Footer/>
    </div>
    </Router>
  );
}

export default App;
