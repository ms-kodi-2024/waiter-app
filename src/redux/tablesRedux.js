//selectors
export const getAllTables = ({ tables }) => tables;
export const selectTableById = ({ tables }, tableId) => 
  tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/posts/${actionName}`;
const UPDATE_TABLES = createActionName("UPDATE_TABLES");
const UPDATE_EDIT_TABLE = createActionName("EDIT_TABLE");

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateEditTable = payload => ({ type: UPDATE_EDIT_TABLE, payload });

// middleware
export const fetchTables = () => {
  return dispatch => {
    fetch('http://localhost:3131/api/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
} 

export const fetchUpdateEditTable = (id, changes) => {
  return dispatch => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
    };

    fetch(`http://localhost:3131/tables/${id}`, options)
      .then(res => {
        if (!res.ok) throw new Error("Error while updating the table");
        return res.json();
      })
      .then(updatedTable => dispatch(updateEditTable(updatedTable)))
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case UPDATE_EDIT_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table);
    default:
      return statePart;
  };
};

export default tablesReducer;