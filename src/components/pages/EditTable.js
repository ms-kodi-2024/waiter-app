import React from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { selectTableById, fetchUpdateEditTable } from "../../redux/tablesRedux";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const EditTable = () => {
	
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const table = useSelector((state) => selectTableById(state, id));
	
	const [status, setStatus] = useState(table?.status);
  const [guestStaying, setGuestStaying] = useState(table?.guestStaying);
  const [tableFor, setTableFor] = useState(table?.tableFor);
  const [bill, setBill] = useState(table?.bill);

  useEffect(() => {
    if (!table) {
      navigate("/");
    } else {
      setStatus(table.status);
      setGuestStaying(table.guestStaying);
      setTableFor(table.tableFor);
      setBill(table.bill);
    }
  }, [table, navigate]);

  if (!table) return null;

	const handleStatusChange = e => {
		const newStatus = e.target.value;
		setStatus(newStatus);
		if (newStatus === "cleaning" || newStatus === "free") {
      setGuestStaying(0);
    }
    if (newStatus !== "busy") {
      setBill(0);
    }
	};
	const handleGuestStayingChange = e => {
    let value = parseInt(e.target.value) || 0;
    value = Math.min(Math.max(value, 0), 10);
    value = Math.min(value, tableFor);
    setGuestStaying(value);
	};
	const handleTableForChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    value = Math.min(Math.max(value, 0), 10);
    setTableFor(value);
    if (guestStaying > value) {
      setGuestStaying(value);
    }
  };
	const handleBillChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    setBill(value);
  };
	
	const handleSubmit = e => {
		e.preventDefault();
		const tableData = {};
		if (status !== table.status) tableData.status = status;
		const adjustedBill = status !== "busy" ? 0 : bill;
    if (guestStaying !== table.guestStaying) tableData.guestStaying = guestStaying;
    if (tableFor !== table.tableFor) tableData.tableFor = tableFor;
		if (adjustedBill !== table.bill) tableData.bill = adjustedBill;
		if (Object.keys(tableData).length > 0) {
			dispatch(fetchUpdateEditTable(id, tableData));
		};
		navigate("/");
	};
	
	return (
		<React.Fragment>
			<h1 className="mb-4">Table {table.id}</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup className="d-flex align-items-center pt-3">
					<Form.Label htmlFor="status" className="fw-bold mb-0">Status: </Form.Label>
					<Form.Select className="ms-4" id="status" value={status} style={{ width: "300px" }} onChange={handleStatusChange}>
						<option value="free">Free</option>
						<option value="busy">Busy</option>
						<option value="reserved">Reserved</option>
						<option value="cleaning">Cleaning</option>
					</Form.Select>
				</FormGroup>
				<FormGroup className="d-flex align-items-center pt-3">
					<Form.Label htmlFor="people" className="fw-bold mb-0">People: </Form.Label>
					<Form.Control type="text" value={guestStaying} id="people" className="ms-4 text-center" style={{ width: "50px" }} onChange={handleGuestStayingChange} />
					<span className="mx-2">/</span>
					<Form.Control type="text" value={tableFor} className="text-center" style={{ width: "50px" }} onChange={handleTableForChange} />
				</FormGroup>
				{status === "busy" && (
					<FormGroup className="d-flex align-items-center pt-3">
						<Form.Label htmlFor="bill" className="fw-bold mb-0">Bill: </Form.Label>
						<span className="ms-4">$</span>
						<Form.Control type="text" value={bill} id="bill" className="ms-2 text-center" style={{ width: "50px" }} onChange={handleBillChange} />
					</FormGroup>
				)}
				<Button variant="primary mt-3" type="submit">Update</Button>
			</Form>
		</React.Fragment>
  );
};

export default EditTable;
