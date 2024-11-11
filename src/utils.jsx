// utils.jsx
export const handleNavigate = (navigate, path, id) => {
  navigate(path, { state: { id } });
};
