import {React} from 'react';
import {Alert} from 'react-bootstrap';

const AlertBox = ({message}) => {
  return (
    <div className="alert-container">
      <Alert variant="danger">
        {message}
      </Alert>
    </div>
  );
};

export default AlertBox;
