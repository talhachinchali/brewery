import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Govt from "./pages/govt/Govt";
import Webinars from "./pages/webinars/Webinars";
import Mentors from "./pages/mentors/Mentors";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import GovtDetailss from "./pages/govt/GovtDetails";
import SingleBrewerie from "./components/SingleBrewerie/SingleBrewerie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user && user.role=="student" ? <Write /> : <Register />}</Route>
        <Route path="/govt">{user ? <Govt /> : <Register />}</Route>
        
        <Route path="/breweries/:id" ><SingleBrewerie/></Route>
        <Route path="/webinars">{user ? <Webinars /> : <Register />}</Route>
        <Route path="/mentors">{user ? <Mentors /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
       
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
