export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url, "http://localhost");
    const url = searchParams.get("url");

    if (!url) {
      return new Response(
        JSON.stringify({ error: "Missing url parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // follow redirects using native fetch
    const response = await fetch(url, { redirect: "follow" });
    const finalUrl = response.url;

    let type = "unknown";
    if (finalUrl.includes("/video/")) {
      type = "video";
    } else if (finalUrl.includes("/@")) {
      type = "account";
    }

    return new Response(
      JSON.stringify({ input: url, final: finalUrl, type }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
