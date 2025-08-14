const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const URL = require("./Models/url");
const router = require("./Routes/url");
const app = express();
const PORT = 8002;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB ?? "mongodb://localhost:27017/short-url")
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.error("this is the error",err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", router);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.json({id:entry.redirectURL});
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));