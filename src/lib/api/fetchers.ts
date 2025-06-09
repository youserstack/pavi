import { SignupSchema } from "@/lib/schemas";
import { ReadonlyURLSearchParams } from "next/navigation";

export async function getProducts(params?: ReadonlyURLSearchParams) {
  const url = `${process.env.TOOPA_API_URL}/api/products?${params?.toString()}`;
  const res = await fetch(url);
  return res.json();
}

export async function signupUser(data: SignupSchema) {
  const url = `${process.env.TOOPA_API_URL}/api/users`;
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
  // const res = await axios(url, {
  //   method: "post",
  //   headers: { "Content-Type": "application/json" },
  //   data,
  // });
}

export async function getProductIds() {
  const url = `${process.env.TOOPA_API_URL}/api/products/ids`;
  const res = await fetch(url);
  return res.json();
}

export async function getProduct(productId: string) {
  const url = `${process.env.TOOPA_API_URL}/api/products/${productId}`;
  const res = await fetch(url);
  return res.json();
}

export async function getUser(user: { email: string }) {
  const url = `${process.env.TOOPA_API_URL}/api/users?email=${user.email}`;
  const res = await fetch(url);
  return res.json();
}

// server action fetchers

export async function authenticateUser(email: string, password: string) {
  const url = `${process.env.TOOPA_API_URL}/api/auth/signin`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const msg = "❌ 인증처리 실패";
    console.error(msg);
    throw new Error(msg);
  }

  return res.json();
}
