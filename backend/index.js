const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 8000;

app.use(express.json());
app.use(cors());

// mongodb://127.0.0.1:27017/PlanYourDay

// mongodb+srv://k67901890:yfA8ADqu6o7KXeBT@note.auazd0t.mongodb.net/?retryWrites=true&w=majority
// k67901890
// oYcoGUX5IJDa4wle

// k67901890
// yfA8ADqu6o7KXeBT

// mongodb+srv://xandy:7Lo9jOlQNyHRhtZH@smart-notes.woezdoz.mongodb.net/?retryWrites=true&w=majority
// 7Lo9jOlQNyHRhtZH

// mongodb+srv://admin:<password>@cluster0.i9e5hj9.mongodb.net/?retryWrites=true&w=majority
// GDLtFjIpaHbQoQ1N

// ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ MONGODB
mongoose
  .connect("mongodb://127.0.0.1:27017/PlanYourDay")
  .then(() => console.log("УСПЕШНОЕ ПОДКЛЮЧЕНИЕ К БД!"))
  .catch((err) => console.log("УПС...", err));

const routes = require("./routes/note");
const userRoutes = require("./routes/user");

app.use(routes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Главная страница");
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, (err) => {
  console.log("so far everything is working like clockwork");

  if (err) {
    console.log(err);
  }
});
