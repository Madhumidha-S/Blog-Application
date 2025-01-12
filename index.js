import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/blog", (req, res) => {
  res.render("blog.ejs");
});

app.post("/blog/new", (req, res) => {
  res.render("newBlog.ejs");
});

app.listen(port, () => {
  console.log(`Starting the Server on the port ${port}.`);
});
