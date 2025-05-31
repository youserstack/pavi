import { SignupSchema } from "@/lib/schemas";
import axios from "axios";

// client fetchers

export async function getProducts(params?: Record<string, string>) {
  const url = `${process.env.TEMP_API_URL2}/api/products`;
  const res = await axios(url, { params });
  return res.data;
}

export async function signupUser(data: SignupSchema) {
  const res = await fetch(`${process.env.API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }

  return res.json(); // 서버에서 유저 정보를 반환하면
}

// server fetchers

export async function getPopularProducts() {
  // 엔드포인트에 쿼리파라미터를 추가하고 인기상품을 조회하도록 변경해야함
  const url = `${process.env.TEMP_API_URL2}/api/products`;
  const res = await fetch(url);
  return res.json();
}

export async function getProductIds() {
  const res = await fetch(`${process.env.BASE_URL}/api/products/productIds`);
  return res.json();
}

export async function getProduct(productId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`);
  return res.json();
}

export async function getUser(user: any) {
  const res = await fetch(`${process.env.API_URL}/api/users?email=${user.email}`);
  return res.json();
}

// server action fetchers

export async function authenticateUser(email: string, password: string) {
  const res = await fetch(`${process.env.API_URL}/api/auth/signin`, {
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
