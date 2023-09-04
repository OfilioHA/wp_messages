import { useCallback, useEffect, useState } from "react";
import { Button, Form, ListGroupItem } from "react-bootstrap";
import { PhoneForm } from "./form";
import { DeleteButton } from "../utils/DeleteButton";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  PhonesAllSeletedState,
  PhonesSeletedState,
} from "../../stores/PhoneStore";

export function PhoneListItem({ phone, reload }) {
  const { id } = phone;

  const [phonesSelecteds, setPhoneSelecteds] = useRecoilState(PhonesSeletedState);
  const [editShow, setEditShow] = useState(false);

  const handleChange = useCallback((event) => {
    const { target: { checked } } = event;
    if (checked) {
      setPhoneSelecteds((old) => [...old, id]);
    } else {
      setPhoneSelecteds((old) => old.filter((item) => item != id))
    }
  }, []);

  return (
    <ListGroupItem>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-1 me-3">
          <Form.Check
            type="switch"
            checked={phonesSelecteds.includes(id)}
            onChange={handleChange}
          />
          <Button variant="warning" onClick={() => setEditShow(true)}>
            <i className="bi bi-pencil"></i>
          </Button>
          <DeleteButton eId={phone.id} route="/phone" reload={reload} />
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <span>{phone.contact}</span>
          <span>{phone.number}</span>
        </div>
      </div>
      <PhoneForm
        show={editShow}
        close={() => setEditShow(false)}
        reload={reload}
        data={phone}
      />
    </ListGroupItem>
  );
}
