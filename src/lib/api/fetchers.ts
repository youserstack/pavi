import axios from "axios";

export async function getProducts(params?: Record<string, string>) {
  const url = `${process.env.TEMP_API_URL2}/api/products`;
  const res = await axios(url, { params });
  return res.data;
}

export async function getUser(user: any) {
  const res = await fetch(`${process.env.API_URL}/api/users?email=${user.email}`);
  return res.json();
}
