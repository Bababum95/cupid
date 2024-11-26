const CUPID_PUBLIC_TOKEN = process.env.CUPID_PUBLIC_TOKEN;
const CUPID_PRIVATE_TOKEN = process.env.CUPID_PRIVATE_TOKEN;

export type TokenStatus = false | "public" | "admin";

export const checkToken = (authHeader: string | null): TokenStatus => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];

  if (token === CUPID_PRIVATE_TOKEN) {
    return "admin";
  }

  if (token === CUPID_PUBLIC_TOKEN) {
    return "public";
  }

  return false;
};
