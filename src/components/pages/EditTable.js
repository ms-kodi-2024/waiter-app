import React from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { selectTableById, fetchUpdateEditTable } from "../../redux/tablesRedux";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const EditTable = () => {
	
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

 	const table = useSelector((state) => selectTableById(state, id));

	const [status, setStatus] = useState(table.status);
	const [guestStaying, setGuestStaying] = useState(table.guestStaying);
	const [tableFor, setTableFor] = useState(table.tableFor);
	const [bill, setBill] = useState(table.bill);

	const handleStatusChange = e => {
    setStatus(e.target.value);
	};
	const handleGuestStayingChange = e => {
    setGuestStaying(e.target.value);
	};
	const handleTableForChange = e => {
    setTableFor(e.target.value);
	};
	const handleBillChange = e => {
    setBill(e.target.value);
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
					<Form.Select className="ms-4" id="status" defaultValue={status} style={{ width: "300px" }} onChange={handleStatusChange}>
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
