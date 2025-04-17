// utils/token.ts
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token){
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}
