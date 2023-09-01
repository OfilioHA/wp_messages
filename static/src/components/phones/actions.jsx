import { useState } from "react";
import { Button, ButtonGroup, Form, ListGroupItem } from "react-bootstrap";
import { PhoneForm } from "./form";
import { useRecoilState } from "recoil";
import { PhonesAllSeletedState } from "../../stores/PhoneStore";

export function PhoneListActions({ reload }) {
  const [selectedAll, setSelectedAll] = useRecoilState(PhonesAllSeletedState);
  const [show, setShow] = useState(false);

  return (
    <ListGroupItem>
      <div className="d-flex">
        <Form.Switch
          className="me-1"
          checked={selectedAll}
          onChange={() => setSelectedAll((old) => !old)}
        />
        <ButtonGroup>
          <Button onClick={() => setShow(true)}>
            <i className="bi bi-plus"></i>
          </Button>
          <Button onClick={reload} variant="outline-primary">
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </ButtonGroup>
      </div>
      <PhoneForm show={show} close={() => setShow(false)} reload={reload} />
    </ListGroupItem>
  );
}
