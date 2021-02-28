// Styles
import classes from './Form-Input.module.css';

// Bootstrap Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function FormInput(props) {
  const {
    controlId,
    label,
    type,
    name,
    value,
    errMessage,
    onChangeHandler,
    isInvalid,
  } = props;

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder=''
        onChange={onChangeHandler}
        name={name}
        value={value}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type='invalid'>{errMessage}</Form.Control.Feedback>
    </Form.Group>
  );
}
