const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3000;

app.use(express.json());
app.use(cors());

// mongodb://127.0.0.1:27017/PlanYourDay

// ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ MONGODB
mongoose
  .connect(
    "mongodb+srv://admin:BrKMCijAkg9YIW15@kotion-note.9nos5rg.mongodb.net/?retryWrites=true&w=majority&appName=kotion-note"
  )
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
