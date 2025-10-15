
import axios from 'axios';

const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAPJd4wEAAAAAgPtm1NZ0viNLUtWD+VFKKAfnQAU=xpqCt9QUm0l0pJS7HzgMaBBltRVhAyKKAYZodlfer75imj6m98';

export default async function handler(req, res) {
  try {
    const query = '@bitdealernet';
    const maxResults = req.query.max_results || 10;

    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=created_at,author_id,public_metrics&max_results=${maxResults}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Vercel /tweets error:', err?.response?.data || err.message);
    res.status(err?.response?.status || 500).json({ error: err?.response?.data || err.message });
  }
}
