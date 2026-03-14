export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { username, password } = req.body || {};
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASS || "admin123";
  const secret = process.env.ADMIN_SECRET || "change-me";
  if (username === adminUser && password === adminPass) {
    const token = secret + "-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
}
