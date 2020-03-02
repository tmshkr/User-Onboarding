import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import initialData from "./data";
import SignupForm from "./components/signup-form";
import TeamList from "./components/team-list";
import TeamMember from "./components/team-member";

function App() {
  const [teamList, setList] = useState(initialData);
  return (
    <Router>
      <div className="app">
        <header className="top">
          <Link to="/">
            <h1>TeamBuilder</h1>
          </Link>
          <nav>
            <Link to="/list">List</Link>
            <Link to="/signup">Signup</Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/signup">
              <SignupForm handleList={[teamList, setList]} />
            </Route>
            <Route path="/team/:member/edit">
              <SignupForm handleList={[teamList, setList]} />
            </Route>
            <Route path="/team/:member">
              <TeamMember handleList={[teamList, setList]} />
            </Route>
            <Route path="/list">
              <TeamList teamList={teamList} />
            </Route>
            <Redirect to="/list" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
