import { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";

export function DeleteButton({ eId, route, reload }) {
  const fetcher = useFetch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleAccepted = useCallback(async () => {
    await fetcher.call(`${route}/${eId}`, {
      method: "DELETE",
    });
    handleClose();
    reload();
  }, []);

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>
        <i className="bi bi-trash"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>¿Esta seguro de eliminar este registro?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="danger">
            No
          </Button>
          <Button onClick={handleAccepted} variant="primary">
            Si
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
