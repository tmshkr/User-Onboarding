import React from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

function TeamMember(props) {
  const [teamList, setList] = props.handleList;
  const history = useHistory();
  const params = useParams();
  const member = teamList[params.member];

  if (!member) {
    return <Redirect to="/list" />;
  }

  const { name, email, github, role } = member;

  const handleDelete = () => {
    const copy = { ...teamList };
    delete copy[params.member];
    setList(copy);
  };

  return (
    <Card className="team-member">
      <CardBody>
        <h2 className="card-title">{name}</h2>
        <p>
          <em>{github}</em>
        </p>
        <p>{email}</p>
        <p>{role}</p>
        <div className="buttons">
          <Button
            color="info"
            onClick={() => history.push(`/team/${params.member}/edit`)}
          >
            Edit
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default TeamMember;
