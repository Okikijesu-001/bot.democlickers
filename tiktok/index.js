import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    let { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // follow redirects
    const response = await fetch(url, { redirect: "follow" });

    // final redirected URL
    const finalUrl = response.url;

    // check if it’s video or account
    let type = "unknown";
    if (finalUrl.includes("/video/")) {
      type = "video";
    } else if (finalUrl.includes("/@")) {
      type = "account";
    }

    return res.status(200).json({
      input: url,
      final: finalUrl,
      type
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
