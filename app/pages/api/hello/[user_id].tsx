export default async function handler(req, res) {
  res.status(200).json({ text: 'id: ' + req.query.user_id });
}
