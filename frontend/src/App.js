
import Navhead from "./component/navhead"
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Jobseekers from "./component/Jobseekers";
import Employers from "./component/Employers";
import SharedLayout from "./component/SharedLayout"


const App = () => {
  return (
    <div className="App">

   <Navhead />

     <Routes>

       <Route path="/" element={ <SharedLayout />  }  > 

       <Route index element={ <HomePage /> }  />

       <Route path="/jobseekers" element={ <Jobseekers /> }  />

       <Route path="/employers" element={ <Employers /> }  />

       </Route>


      

     </Routes>
 
 
   
    </div>

  );
}

export default App;
