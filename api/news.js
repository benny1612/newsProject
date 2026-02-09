export default async function fetchHandler(req, res) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API KEY is missing!" });
    }
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch" });
  }
}
