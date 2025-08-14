const { v4: uuidv4 } = require('uuid');
const URL = require("../Models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = uuidv4();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: null,
  });
return res.json({ id: shortID });

}
module.exports = { handleGenerateNewShortURL };
