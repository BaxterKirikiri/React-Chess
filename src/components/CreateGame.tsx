import { useRef } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { createGame } from "../services/Firestore";

const CreateGame: React.FC<{ challenger: string; callback: Function }> = ({
  challenger,
  callback,
}) => {
  const opponentRef = useRef<HTMLInputElement>(null);

  const challengeOpponent = () => {
    const opponent = opponentRef.current!.value;
    createGame(challenger, opponent);
    callback();
  };

  return (
    <div>
      <Container style={{ maxWidth: "500px" }} fluid>
        <Form className="mt-4">
          <Form.Group>
            <Form.Label>Opponent ID</Form.Label>
            <Form.Control
              ref={opponentRef}
              type="String"
              placeholder="Opponent ID"
            />
          </Form.Group>
          <p>My ID: {challenger}</p>
          <br />
          <Form.Row>
            <Col xs={6}>
              <Button onClick={challengeOpponent} type="button" block>
                Challenge
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
      <br />
    </div>
  );
};

export default CreateGame;
