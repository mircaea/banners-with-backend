const express = require("express");
const cors = require("cors");
const config = require("./config");
const bannerRoutes = require("./routes/banner-routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", bannerRoutes.routes);

app.listen(config.port, () => {
  console.log("Listening on port " + config.port);
});
