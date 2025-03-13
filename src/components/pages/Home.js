import { getAllTables, fetchTables, removeTableRequest } from "../../redux/tablesRedux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Home = () => {
	const dispatch = useDispatch();
	const tables = useSelector(getAllTables);

	useEffect(() => dispatch(fetchTables()), [dispatch]);

	const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      dispatch(removeTableRequest(id));
    }
  };

  return (
    <>
      <h1 className="me-auto">All tables</h1>
      <ListGroup as="ul">
				{tables.map(table => (
					<ListGroupItem as="li" md="4" key={table.id} className="border-start-0 border-end-0 border-top-0">
						<div className="d-flex align-items-center justify-content-between py-3">
							<div className="d-flex align-items-center">
								<h1 className="fs-2">Table {table.id}</h1>
									<p className="mb-1 ps-5">
										<strong>Status: </strong>
										<span className="text-uppercase">{table.status.charAt(0)}</span>
										{table.status.slice(1)}
									</p>
							</div>	
							<div>
								<Link to={`/table/edit/${table.id}`} className="btn btn-primary me-4">Show more</Link>
								<button type="button" className="btn btn-danger" onClick={() => handleDelete(table.id)}>Delete</button>
							</div>
						</div>
					</ListGroupItem>
				))}
      </ListGroup>
    </>
  );
};

export default Home;
