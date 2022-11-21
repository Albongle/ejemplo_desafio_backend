const express = require("express");
const path = require("path");
const { engine: expresshbs } = require("express-handlebars");
const socketIO = require("socket.io");
const app = new express();
const api = require("./routes/index.route");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//settings
app.set("port", process.env.PORT || 3000);
app.engine(
  "hbs",
  expresshbs({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "/views/layouts/"),
    partialsDir: path.join(__dirname, "/views/partials/"),
  })
);

app.set("views", "./views/");
app.set("view engine", "hbs");

//api
app.use(api);

//server
const server = app.listen(app.get("port"), () =>
  console.log(`App corriendo en ${app.get("port")}`)
);

//socket
const io = socketIO(server);
io.on("connection", (socket) => {
  console.log("Usuario conectado con ID", socket.id);
  socket.on("new:producto", (data) => {
    io.sockets.emit("new:producto", data);
  });
});
