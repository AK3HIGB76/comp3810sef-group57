const express = require("express");
const session = require("express-session");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// -------------------------------
// 1. MongoDB Connection
// -------------------------------
// IMPORTANT: put your REAL MongoDB URI here
// Example: const uri = "mongodb+srv://s1410:YourRealPassword@cluster00.slcbulx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00";
const uri = "mongodb+srv://s1410:1410@cluster00.slcbulx.mongodb.net/?appName=Cluster00";

const client = new MongoClient(uri);
let usersCollection;
let inventoryCollection;


// -------------------------------
// 2. Express Configuration
// -------------------------------
app.use(express.urlencoded({ extended: true })); // form data
app.use(express.json()); // JSON
app.set("view engine", "ejs");
app.use(express.static("public"));

// -------------------------------
// 3. Session Setup
// -------------------------------
app.use(
    session({
        secret: "comp3810secretkey",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
    })
);

// Middleware to protect pages
function requireLogin(req, res, next) {
    if (!req.session.staffID) {
        return res.redirect("/login");
    }
    next();
}

// -------------------------------
// 4. Routes (Login System for Staff)
// -------------------------------

// Home – redirect based on login
app.get("/", (req, res) => {
    if (req.session.staffID) {
        return res.redirect("/dashboard");
    }
    return res.redirect("/login");
});

// LOGIN page
app.get("/login", (req, res) => {
    res.render("login", { error: null });
});

// LOGIN action
app.post("/login", async (req, res) => {
    const { staffID, password } = req.body;

    const staff = await usersCollection.findOne({ staffID });

    if (!staff || staff.password !== password) {
        return res.render("login", { error: "Invalid Staff ID or password" });
    }

    // Save session
    req.session.staffID = staffID;

    return res.redirect("/dashboard");
});

// REGISTER page
app.get("/register", (req, res) => {
    res.render("register", { error: null });
});

// REGISTER action
app.post("/register", async (req, res) => {
    const { staffID, password } = req.body;

    // Check if staffID already exists
    const exist = await usersCollection.findOne({ staffID });
    if (exist) {
        return res.render("register", { error: "Staff ID already exists" });
    }

    // Insert new staff user
    await usersCollection.insertOne({ staffID, password });

    return res.redirect("/login");
});

// DASHBOARD (Protected)
app.get("/dashboard", requireLogin, (req, res) => {
    res.render("dashboard", { staffID: req.session.staffID });
});

// LOGOUT
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

// -------------------------------
// 5. Inventory CRUD (Protected)
// -------------------------------

// List all inventory items
app.get("/inventory", requireLogin, async (req, res) => {
    try {
        const items = await inventoryCollection
            .find({})
            .sort({ name: 1 })
            .toArray();

        res.render("inventory_list", { staffID: req.session.staffID, items });
    } catch (err) {
        console.error(err);
        res.send("Error loading inventory.");
    }
});

// Show form to add new item
app.get("/inventory/add", requireLogin, (req, res) => {
    res.render("inventory_add", { staffID: req.session.staffID, error: null });
});

// Handle add item form submission
app.post("/inventory/add", requireLogin, async (req, res) => {
    try {
        const { name, quantity, category, price, status } = req.body;

        const quantityNumber = parseInt(quantity, 10);
        const priceNumber = parseFloat(price);

        if (!name || isNaN(quantityNumber) || isNaN(priceNumber) || !category || !status) {
            return res.render("inventory_add", {
                staffID: req.session.staffID,
                error: "Please fill in all fields correctly."
            });
        }

        const item = {
            name,
            quantity: quantityNumber,
            category,
            price: priceNumber,
            status
        };

        await inventoryCollection.insertOne(item);

        res.redirect("/inventory");
    } catch (err) {
        console.error(err);
        res.send("Error adding item.");
    }
});

// Show edit form for one item
app.get("/inventory/edit/:id", requireLogin, async (req, res) => {
    try {
        const id = req.params.id;
        const item = await inventoryCollection.findOne({ _id: new ObjectId(id) });

        if (!item) {
            return res.send("Item not found.");
        }

        res.render("inventory_edit", {
            staffID: req.session.staffID,
            item,
            error: null
        });
    } catch (err) {
        console.error(err);
        res.send("Error loading item for edit.");
    }
});

// Handle edit form submission
app.post("/inventory/edit/:id", requireLogin, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, quantity, category, price, status } = req.body;

        const quantityNumber = parseInt(quantity, 10);
        const priceNumber = parseFloat(price);

        if (!name || isNaN(quantityNumber) || isNaN(priceNumber) || !category || !status) {
            const item = {
                _id: new ObjectId(id),
                name,
                quantity: quantityNumber,
                category,
                price: priceNumber,
                status
            };
            return res.render("inventory_edit", {
                staffID: req.session.staffID,
                item,
                error: "Please fill in all fields correctly."
            });
        }

        await inventoryCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    quantity: quantityNumber,
                    category,
                    price: priceNumber,
                    status
                }
            }
        );

        res.redirect("/inventory");
    } catch (err) {
        console.error(err);
        res.send("Error updating item.");
    }
});

// Delete an item
app.get("/inventory/delete/:id", requireLogin, async (req, res) => {
    try {
        const id = req.params.id;
        await inventoryCollection.deleteOne({ _id: new ObjectId(id) });
        res.redirect("/inventory");
    } catch (err) {
        console.error(err);
        res.send("Error deleting item.");
    }
});

// =======================
// REST API (JSON)
// =======================

// 1. GET all inventory items
app.get("/api/inventory", async (req, res) => {
    const items = await inventoryCollection.find().toArray();
    res.json(items);
});

// 2. ADD new inventory item
app.post("/api/inventory", async (req, res) => {
    const newItem = req.body;
    await inventoryCollection.insertOne(newItem);
    res.json({ message: "Item added successfully", item: newItem });
});

// 3. UPDATE an inventory item
app.put("/api/inventory/:id", async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    await inventoryCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
    );

    res.json({ message: "Item updated successfully" });
});

// 4. DELETE an inventory item
app.delete("/api/inventory/:id", async (req, res) => {
    const id = req.params.id;

    await inventoryCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Item deleted successfully" });
});


// -------------------------------
// 6. Start Server + Connect DB
// -------------------------------
async function startServer() {
  try {
    await client.connect();
    const db = client.db("comp3810db");
    usersCollection = db.collection("users");
    inventoryCollection = db.collection("inventory"); // NEW

    console.log("Connected to MongoDB (Cluster00)");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();



startServer();

