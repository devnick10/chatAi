"use client";

export default function useToken() {
  function setToken(token: string) {
    localStorage.setItem("token", token);
  }

  function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  return {
    setToken,
    getToken,
  };
}
