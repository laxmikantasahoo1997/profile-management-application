export const saveProfileToLocalStorage = (profile: object) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfileFromLocalStorage = () => {
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
};

export const clearProfileFromLocalStorage = () => {
  localStorage.removeItem("profile");
};
