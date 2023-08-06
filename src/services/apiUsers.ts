/* eslint-disable import/prefer-default-export */
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchUsers = async () =>
  fetch(`${BASE_URL}/posts`)
    .then((response) => response.json())
    .then((json) => json);

const UsersApi = {
  fetchUsers,
};

export default UsersApi;
