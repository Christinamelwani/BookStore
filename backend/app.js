const { app } = require("./bin/www");
require("dotenv").config();

app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});
