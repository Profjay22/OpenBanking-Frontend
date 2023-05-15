import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RenderHomePage from './Components/RenderHomePage';
import Profiles from './Components/Profiles';

function App() {
return (
<Router>
<div>
<Routes>
<Route path="/" element={<RenderHomePage/>}/>
<Route path="/profile" element={<Profiles/>}/>
</Routes>
</div>
</Router>
);
}

export default App;