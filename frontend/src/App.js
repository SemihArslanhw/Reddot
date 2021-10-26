import React,{useState} from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Post from "./pages/Post";
import Chat from "./pages/Chat";
import Category from "./pages/Category";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";

function App() {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/login" >
          {user ? <Redirect to="/"/> :<Login/>}
          </Route>
          <Route path="/chat" >
          {!user ? <Redirect to="/"/> :<Chat/>}
          </Route>
          <Route path="/notifications" >
          {!user ? <Redirect to="/"/> :<Notifications/>}
          </Route>
          <Route path="/submit" >
          {!user ? <Redirect to="/"/> :<CreatePost/>}
          </Route>
          <Route path="/register" >
            {user ? <Redirect to="/"/> :<Register/>}
          </Route>
          <Route path="/profile/:username" >
            <Profile/>
          </Route>
          <Route path="/post/:post_id" >
            <Post/>
          </Route>
          <Route path="/category/:category" exact>
            <Category/>
          </Route>
          <Route path="/editprofile/:username" exact>
            <EditProfile/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
