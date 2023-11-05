const express = require("express");
const db = require("./models");
const tradeRoute = require("./routes/tradeRoute");

const app = express();

// For Parsing Application/JSON
app.use(express.json());

// Routes
app.use("/api/trade", tradeRoute);

db.sequelize
  .sync(/*{ force: true }*/)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`App started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
