const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

const FILE = "tasks.json";

function readTasks() {
try {
return JSON.parse(fs.readFileSync(FILE));
} catch {
return [];
}
}

function saveTasks(tasks) {
fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
res.json({ status: "healthy" });
});

app.get("/tasks", (req, res) => {
res.json(readTasks());
});

app.post("/tasks", (req, res) => {
const tasks = readTasks();

const task = {
id: Date.now(),
task: req.body.task
};

tasks.push(task);
saveTasks(tasks);

res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
let tasks = readTasks();

tasks = tasks.filter(t => t.id != req.params.id);

saveTasks(tasks);

res.json({ message: "Task Deleted" });
});

app.listen(PORT, "0.0.0.0", () => {
console.log(`Running on port ${PORT}`);
});

