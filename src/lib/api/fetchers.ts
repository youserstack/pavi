export async function getProducts(url: string, option?: any) {
  const res = await fetch(url, option);
  return res.json();
}

// export async function getProducts() {
//   const res = await fetch(process.env.TEMP_API_URL as string);
//   return res.json();
// }

export async function getUser(user: any) {
  const res = await fetch(`${process.env.API_URL}/api/users?email=${user.email}`);
  return res.json();
}
