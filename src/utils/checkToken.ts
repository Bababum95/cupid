const CUPID_PUBLIC_TOKEN = process.env.CUPID_PUBLIC_TOKEN;

export const checkToken = (authHeader: string | null): boolean => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  return token === CUPID_PUBLIC_TOKEN;
};
