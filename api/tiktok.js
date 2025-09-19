import { https } from "follow-redirects";

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    https.get(url, (response) => {
      const finalUrl = response.responseUrl || url;

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
    }).on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
