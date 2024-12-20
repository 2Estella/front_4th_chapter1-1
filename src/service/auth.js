export const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => {
  return !!loadUserFromLocalStorage();
};

export const getUserFromLocalStorage = () => {
  return loadUserFromLocalStorage();
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
