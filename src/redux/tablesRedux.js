import { API_URL } from "../config";

//selectors
export const getAllTables = ({ tables }) =>
  [...tables].sort((a, b) => a.id - b.id);
export const selectTableById = ({ tables }, tableId) => 
  tables.find(table => table.id === Number(tableId));

// actions
const createActionName = actionName => `app/${actionName}`;
const UPDATE_TABLES = createActionName("UPDATE_TABLES");
const UPDATE_EDIT_TABLE = createActionName("EDIT_TABLE");
const ADD_TABLE = createActionName("tables/ADD_TABLE");
const REMOVE_TABLE = createActionName("tables/REMOVE_TABLE");

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateEditTable = payload => ({ type: UPDATE_EDIT_TABLE, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });

// middleware
export const fetchTables = () => {
  return dispatch => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};
export const fetchUpdateEditTable = (id, changes) => {
  return dispatch => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(changes)
    };
    fetch(`${API_URL}/tables/${id}`, options)
      .then(res => {
        if (!res.ok) throw new Error("Error while updating the table");
        return res.json();
      })
      .then(updatedTable => dispatch(updateEditTable(updatedTable)))
  }
};
export const addTableRequest = (table) => {
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(table),
    }
    fetch(`${API_URL}/tables`, options)
      .then(res => res.json())
      .then(newTable => dispatch(addTable(newTable)));
  };
};
export const removeTableRequest = (tableId) => {
  return dispatch => {
    const options = {
      method: "DELETE"
    }
    fetch(`${API_URL}/tables/${tableId}`, options)
      .then(() => dispatch(removeTable(tableId)));
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case UPDATE_EDIT_TABLE:
      return statePart.map(table =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table);
    case ADD_TABLE:
      return [...statePart, action.payload];
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    default:
      return statePart;
  };
};

export default tablesReducer;