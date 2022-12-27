const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

app.use(cors());
app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));

app.use(typeError);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
app.use(express.static("./images"));
dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
