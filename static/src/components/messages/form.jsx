import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Card, Form, Button } from "react-bootstrap";
import { TextField } from "../utils/forms/TextField";
import { useFetch } from "../../hooks/useFetch";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  PhonesAllSeletedState,
  PhonesSeletedState,
} from "../../stores/PhoneStore";

export function MessageForm() {
  const inputFile = useRef(null);
  const fetcher = useFetch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectAll = useRecoilValue(PhonesAllSeletedState);
  const selectPhone = useRecoilValue(PhonesSeletedState);

  const formik = useFormik({
    initialValues: {
      image: "",
      content: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed().notRequired(),
      content: Yup.string().required(),
    }),
    onSubmit: async (values, helper) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      let file = null;
      const formData = new FormData();
      file = inputFile.current.files[0];
      formData.append("image", file || false);
      formData.append("content", values.content);
      formData.append("selected", selectPhone);
      formData.append("all", selectAll);
      await fetcher.call("/message", {
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        data: formData,
      });
      setIsSubmitting(false);
      helper.resetForm();
    },
  });

  return (
    <Card>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Card.Body style={{ height: "381px" }}>
            <Field
              type="file"
              label="Imagen"
              name="image"
              component={TextField}
              id="message-image"
              refE={inputFile}
            />
            <Field
              label="Contenido"
              name="content"
              component={TextField}
              id="message-content"
              htmlAs="textarea"
              rows={6}
            />
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-end">
              <Button type="submit">Enviar</Button>
            </div>
          </Card.Footer>
        </Form>
      </FormikProvider>
    </Card>
  );
}
