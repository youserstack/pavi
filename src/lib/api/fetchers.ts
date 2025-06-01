import { SignupSchema } from "@/lib/schemas";
import axios from "axios";

// client fetchers

export async function getProducts(params?: Record<string, string>) {
  const url = `${process.env.COOZA_API_URL}/api/products`;
  const res = await axios(url, { params });
  return res.data;
}

export async function signupUser(data: SignupSchema) {
  const url = `${process.env.TOOPA_API_URL}/api/users`;
  const res = await axios(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    data,
  });
  return res.data;
}

// server fetchers

export async function getPopularProducts() {
  // 엔드포인트에 쿼리파라미터를 추가하고 인기상품을 조회하도록 변경해야함
  const url = `${process.env.COOZA_API_URL}/api/products`;
  const res = await fetch(url);
  return res.json();
}

export async function getProductIds() {
  const url = `${process.env.COOZA_API_URL}/api/products/productIds`;
  const res = await fetch(url);
  return res.json();
}

export async function getProduct(productId: string) {
  const url = `${process.env.COOZA_API_URL}/api/products/${productId}`;
  const res = await fetch(url);
  return res.json();
}

export async function getUser(user: any) {
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
