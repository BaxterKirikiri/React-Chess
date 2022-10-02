import { useRef } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import FirestoreChess from "../services/firestoreChess";

const CreateGame: React.FC<{ challenger: string }> = ({
  challenger: string,
}) => {
  const opponentEmailRef = useRef<HTMLInputElement>(null);

  const challengeOpponent = () => {
    console.log(opponentEmailRef.current!.value);
  };

  return (
    <div>
      <Container style={{ maxWidth: "500px" }} fluid>
        <Form className="mt-4">
          <Form.Group controlId="formEmail">
            <Form.Label>Opponent Email</Form.Label>
            <Form.Control
              ref={opponentEmailRef}
              type="email"
              placeholder="email"
            />
          </Form.Group>
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
