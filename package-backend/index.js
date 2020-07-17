const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const db = require("./models");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get("/packages", async (req, res, next) => {
  try {
    const packages = await db.Package.find({});
    return success(res, packages);
  } catch (err) {
    next({ status: 400, message: "failed to get packages" });
  }
});

app.post("/packages", async (req, res, next) => {
  console.log(req.body);
  try {
    const package = await db.Package.create(req.body.item);
    return success(res, package);
  } catch (err) {
    next({ status: 400, message: "failed to create package" });
  }
});

app.put("/packages/:id", async (req, res, next) => {
  try {
    const package = await db.Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return success(res, package);
  } catch (err) {
    next({ status: 400, message: "failed to update package" });
  }
});

app.delete("/packages/:id", async (req, res, next) => {
  try {
    await db.Package.findByIdAndRemove(req.params.id);
    return success(res, "package deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete package" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
