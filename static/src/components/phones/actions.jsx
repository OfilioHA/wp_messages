import { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Form, ListGroupItem } from "react-bootstrap";
import { PhoneForm } from "./form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  PhonesAllSeletedState,
  PhonesSeletedState,
} from "../../stores/PhoneStore";

export function PhoneListActions({ reload }) {
  const selectedAll = useRecoilValue(PhonesAllSeletedState);
  const [phonesSelected, setPhoneSelected] = useRecoilState(PhonesSeletedState);

  const [show, setShow] = useState(false);

  const handleChange = useCallback((event)=>{
    const { target : { checked } } = event;
    if(checked){
      setPhoneSelected(selectedAll)
    }else{
      setPhoneSelected([]);
    }
  }, [selectedAll]);

  return (
    <ListGroupItem>
      <div className="d-flex">
        <Form.Switch
          className="me-1"
          checked={phonesSelected.length == selectedAll.length}
          onChange={handleChange}
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
