import { UsersTesting } from "constants/UsersTesting";

export const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/users/${userId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let user = UsersTesting.find((user) => user.id == userId);
    resolve({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      postalCode: user.postalCode,
    });
  });
};
