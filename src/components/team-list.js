import React from "react";
import { Alert, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

function TeamList(props) {
  const { teamList } = props;
  const arr = Object.values(teamList);
  return (
    <div className="team-list">
      <ListGroup>
        {arr.length > 0 ? (
          arr.map(m => (
            <Link key={m.github} to={`/team/${m.github}`}>
              <ListGroupItem>
                {m.name} <span>{m.github}</span>
              </ListGroupItem>
            </Link>
          ))
        ) : (
          <Alert color="primary">
            Add team members and they will appear here
          </Alert>
        )}
      </ListGroup>
    </div>
  );
}

export default TeamList;
