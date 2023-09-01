import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { TextField } from "../utils/forms/TextField";
import { useFetch } from "../../hooks/useFetch";

export function PhoneForm({ show, close, reload, data = null }) {
  const fetcher = useFetch();

  const formik = useFormik({
    initialValues: data ?? {
      number: "",
      contact: "",
    },
    validationSchema: Yup.object({
      number: Yup.string().required().max(20),
      contact: Yup.string().required().max(25),
    }),
    onSubmit: async (values, helper) => {
      const id = values?.id;
      await fetcher.call("/phone", {
        data: values,
        method: id ? "PUT" : "POST",
      });
      close();
      reload();
    },
  });

  return (
    <Modal
      show={show}
      onHide={close}
      onExited={() => formik.resetForm()}
      centered
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Field
              type="text"
              label="Contacto"
              name="contact"
              component={TextField}
              id="phone-contact"
            />
            <Field
              type="text"
              label="Número"
              name="number"
              component={TextField}
              id="phone-number"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
