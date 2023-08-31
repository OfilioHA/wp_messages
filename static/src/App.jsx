import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./App.css";
import { PhoneList } from "./components/phones/list";
import { MessageForm } from "./components/messages/form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="10">
            <h2>Hwllor World</h2>
            <hr />
          </Col>
          <Col md={10}>
            <Row className="justify-content-between">
              <Col md={6}>
                <PhoneList />
              </Col>
              <Col md={5}>
                <MessageForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
