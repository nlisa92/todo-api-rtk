export const addTask = (task) => ({
  type: "addTask",
  payload: task,
});

export const deleteTask = (id) => ({
  type: "deleteTask",
  payload: id,
});

export const toggleDone = (id) => ({
  type: "toggleDone",
  payload: id,
});

export const editTask = (id, newTitle) => ({
  type: "editTask",
  payload: { id, newTitle },
});

export const toggleEditMode = (taskId) => ({
  type: "toggleEditMode",
  payload: taskId,
});

export const setEditText = (taskId, text) => ({
  type: "setEditText",
  payload: { taskId, text },
});
