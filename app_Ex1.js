const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// About Page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "about.html"));
});

// Contact Page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "contact.html"));
});

// Style File
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "style.css"));
});

// 404 Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

//returns a list of all products in JSON format
app.get("/products", (req, res) => {
  res.json(products);
});

//returns details of a specific product by ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

//returns a list of all users or filters users by age query parameter
app.get("/users", (req, res) => {
  const age = parseInt(req.query.age, 10);
  if (age) {
    const filteredUsers = users.filter((user) => user.age > age);
    res.json(filteredUsers);
  } else {
    res.json(users);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
