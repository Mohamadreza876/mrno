const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Ali", email: "ali@example.com" },
  { id: 2, name: "Sara", email: "sara@example.com" }
];

let tasks = [
  { id: 1, title: "Learn Docker", description: "Build the API image", userId: 1, completed: false },
  { id: 2, title: "Study networking", description: "Review TCP/IP", userId: 2, completed: true }
];

app.get("/", (req, res) => res.status(200).json({ message: "Task Manager API is running" }));

// USERS
app.get("/api/users", (req, res) => res.status(200).json(users));

app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  const user = { id: Date.now(), name, email };
  users.push(user);
  res.status(201).json(user);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  if (req.body.name !== undefined) user.name = req.body.name;
  if (req.body.email !== undefined) user.email = req.body.email;
  res.status(200).json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index < 0) return res.status(404).json({ error: "User not found" });
  const deleted = users.splice(index, 1)[0];
  res.status(200).json({ message: "User deleted", user: deleted });
});

// TASKS
app.get("/api/tasks", (req, res) => res.status(200).json(tasks));

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(200).json(task);
});

app.post("/api/tasks", (req, res) => {
  const { title, description = "", userId, completed = false } = req.body;
  if (!title || !userId) return res.status(400).json({ error: "title and userId are required" });
  if (!users.some(u => u.id === Number(userId))) return res.status(400).json({ error: "userId does not exist" });
  const task = { id: Date.now(), title, description, userId: Number(userId), completed: Boolean(completed) };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  const { title, description, userId, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (userId !== undefined) {
    if (!users.some(u => u.id === Number(userId))) return res.status(400).json({ error: "userId does not exist" });
    task.userId = Number(userId);
  }
  if (completed !== undefined) task.completed = Boolean(completed);
  res.status(200).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index < 0) return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(index, 1)[0];
  res.status(200).json({ message: "Task deleted", task: deleted });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) return res.status(400).json({ error: "Invalid JSON body" });
  next(err);
});

app.listen(PORT, "0.0.0.0", () => console.log(`Task Manager API listening on port ${PORT}`));
