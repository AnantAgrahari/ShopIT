import Header from "./components/layout/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
    <div className="App">
      <Header/>

     <div className="container">
     <Routes>                                     
      <Route path="/" element={<Home/>}/>        
     </Routes>
     </div>

      <Footer/>
    </div>
    </Router>
  );
}

export default App;
