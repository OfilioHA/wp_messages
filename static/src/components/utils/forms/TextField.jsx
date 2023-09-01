import { 
    FormGroup, FormControl,
    FormLabel
} from "react-bootstrap";

export function TextField({
  field: { ...fields },
  form: { touched, errors, ...rest },
  marginSize,
  htmlAs = 'input',
  refE = null,
  ...props
}) {
  const invalid = Boolean(touched[fields.name] && errors[fields.name]);

  if(!marginSize) marginSize = 3;

  return (
    <FormGroup className={`mb-${marginSize}`}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <FormControl
        {...props}
        {...fields}
        as={htmlAs}
        ref={refE}
        isInvalid={invalid}
      />
    </FormGroup>
  );
}
