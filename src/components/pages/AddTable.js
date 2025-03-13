import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTables, addTableRequest } from "../../redux/tablesRedux";
import { Form, Button, FormGroup } from "react-bootstrap";

const AddTable = () => {
  const tables = useSelector(getAllTables);
  const [id, setId] = useState(0);
  const [tableFor, setTableFor] = useState(0);
  const status = "free";
  const guestStaying = 0;
  const bill = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isIdTaken = tables.some(table => table.id === id);

  const handleIdChange = e => {
    const parsedValue = parseInt(e.target.value);
    let value;
    if (!parsedValue) {
      value = tables.length > 0 ? Math.max(...tables.map(table => table.id)) + 1 : 1;
    } else {
      value = parsedValue;
    }
    setId(value);
  };

  const handleTableForChange = e => {
    let value = parseInt(e.target.value) || 0;
    value = Math.min(Math.max(value, 0), 10);
    setTableFor(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isIdTaken) return;
    const newTable = { id, status, guestStaying, tableFor, bill };
    dispatch(addTableRequest(newTable));
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mb-4">Add table</h1>
      <FormGroup>
        <Form.Label htmlFor="numberOfTable">Number of table: </Form.Label>
        <Form.Control
          type="text"
          id="numberOfTable"
          value={id}
          onChange={handleIdChange}
          style={{ width: "300px" }}
          required
        />
        {isIdTaken && <p className="text-danger mt-2">This table number is already taken!</p>}
      </FormGroup>
      <FormGroup>
        <Form.Label htmlFor="tableFor">Max number of people at the table:</Form.Label>
        <Form.Control
          type="text"
          id="tableFor"
          value={tableFor}
          onChange={handleTableForChange}
          style={{ width: "300px" }}
          required
        />
      </FormGroup>
      <Button variant="primary mt-3" type="submit" disabled={isIdTaken}>
        Add table
      </Button>
    </Form>
  );
};

export default AddTable;
