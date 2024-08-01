export function logoutUser() {
  localStorage.removeItem("status");
  localStorage.removeItem("user");
  location.reload();
}
