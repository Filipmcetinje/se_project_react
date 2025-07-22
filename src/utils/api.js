const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => res.json());
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};
