import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';

function App() {

  return (
    
     <BrowserRouter>
           
     <div id = "app">
         <Header/> 
         <Routes>          
           <Route exact path='/' element={<Homepage/>} />
          <Route path='/coins/:id' element={<Coinpage/>} /> 
         </Routes>
        </div>  
     </BrowserRouter>
    
  );
}

export default App

