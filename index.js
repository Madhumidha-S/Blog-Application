import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import * as fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/blog", (req, res) => {
  fs.readFile("blogs.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading blogs:", err);
      return res.status(500).send("Error loading blogs.");
    }
    const blogs = data.split("\n\n").filter((entry) => entry.trim() !== ""); // Split blogs & remove empty entries
    res.render("blog.ejs", { blogs }); // Send blogs array to blog.ejs
  });
});

app.get("/blog/new", (req, res) => {
  res.render("newBlog.ejs");
});

app.post("/blog/new", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and content are required.");
  }

  const blogEntry = `Title: ${title}\nContent: ${content}\n\n`;

  fs.appendFile("blogs.txt", blogEntry, (err) => {
    if (err) {
      console.error("Error saving blog:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log("Blog saved!");
    res.redirect("/blog");
  });
});

app.listen(port, () => {
  console.log(`Starting the Server on the port ${port}.`);
});
