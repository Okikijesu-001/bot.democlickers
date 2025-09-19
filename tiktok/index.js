export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Use native fetch in Node 18+ (Vercel supports this)
    const response = await fetch(url, { redirect: "follow" });
    const finalUrl = response.url;

    // Decide link type
    let type = "unknown";
    if (finalUrl.includes("/video/")) {
      type = "video";
    } else if (finalUrl.includes("/@")) {
      type = "account";
    }

    res.status(200).json({
      input: url,
      final: finalUrl,
      type
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
