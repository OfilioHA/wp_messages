import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import { PhoneList } from "./components/phones/list";
import { MessageForm } from "./components/messages/form";

function App() {
   return (
    <>
      <Container>
        <Row className="vh-100 justify-content-center align-items-center">
          <Col md={11}>
            <h2>Whatsapp Messages Sender</h2>
            <hr className="my-4"/>
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
