import UserMS from "apis/UserMS";

export const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    UserMS.get(`/users/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getUserByEmail = (email) => {
  let encodedEmail = encodeURIComponent(
    JSON.stringify({ email: email, deletedAt: "" })
  );

  return new Promise((resolve, reject) => {
    UserMS.get(`/users/${encodedEmail}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const patchUser = (userId, user) => {
  return new Promise((resolve, reject) => {
    UserMS.patch(`/users/${userId}`, user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const postUser = (user) => {
  return new Promise((resolve, reject) => {
    UserMS.post(`/users`, user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
