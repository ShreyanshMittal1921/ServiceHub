const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Worker = require("./models/Worker");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/urbanclap_clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Add a worker
app.post("/api/workers", async (req, res) => {
  try {
    const { name, service_type, location, rating } = req.body;

    // Basic validation
    if (!name || !service_type || !location) {
      return res.status(400).json({ error: "Name, service_type, and location are required." });
    }

    const worker = new Worker({ name, service_type, location, rating });
    await worker.save();
    res.status(201).json(worker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get workers by service and location
app.get("/api/workers", async (req, res) => {
  try {
    const { service, location } = req.query;
    let filter = {};
    if (service) filter.service_type = new RegExp(service, "i");
    if (location) filter.location = new RegExp(location, "i");

    const workers = await Worker.find(filter);
    res.json(workers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

