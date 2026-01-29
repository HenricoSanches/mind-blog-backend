import api from "./api";

export async function loginRequest(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data; // { token }
}

export async function getMe(token) {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
