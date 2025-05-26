export async function getProducts(queryString?: string) {
  const url = `${process.env.TEMP_API_URL2}/api/products${queryString ? queryString : ""}`;
  const res = await fetch(url);
  return res.json();
}

export async function getUser(user: any) {
  const res = await fetch(`${process.env.API_URL}/api/users?email=${user.email}`);
  return res.json();
}
