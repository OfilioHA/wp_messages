import { FormGroup, FormCheck, FormLabel } from "react-bootstrap";

export function RadioField({
  field,
  form: { touched, errors, values },
  disabled = false,
  marginSize = 3,
  options = [],
  ...props
}) {
  const invalid = Boolean(touched[field.name] && errors[field.name]);

  let value = values[field.name];
  if (value == undefined) value = [];

  const type = props.type;
  const methods = {
    checkbox: (value, id) => value.includes(id.toString()),
    radio: (value, id) => value == id,
  };

  return (
    <FormGroup className={`mb-${marginSize}`}>
      <FormLabel className="d-block">{props.label}</FormLabel>
      {options.map(({ id, name }) => {
        const checked = methods[type](value, id);
        return (
          <FormCheck
            {...props}
            {...field}
            key={`${props.id}-${id}`}
            id={`${props.id}-${id}`}
            isInvalid={invalid}
            label={name}
            value={id}
            checked={checked}
          />
        );
      })}
    </FormGroup>
  );
}
