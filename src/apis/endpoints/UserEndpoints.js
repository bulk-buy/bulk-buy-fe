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
  let encodedEmail = encodeURIComponent(JSON.stringify({ email: email }));

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
