const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
