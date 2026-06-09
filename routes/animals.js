import express from "express";
import { Animal } from "../models/Animal.js";
import { upload } from "../config/cloudinary.js";
import { sendAnimalListedEmail } from "../config/email.js";

const router = express.Router(); //similar to flask blueprint inter_bp=("interview",__name__)intilize

//@inter_bp.route('/question',methods=[post]): then i define func
router.get("/", async (req, res) => { //req contain react send body res contain our func responce
  try {
    const animals = await Animal.find().sort({ createdAt: -1 }); // get all animals newest first
    res.json({ success: true, animals });
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ success: false, message: "Failed to fetch animals" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ success: false, message: "Animal not found" });
    res.json({ success: true, animal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch animal" });
  }
});

// upload.single("image")  multer intercepts the request, uploads to Cloudinary, for many files we use upload.array
// and puts the resulting URL at req.file.path before your handler runs
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, breed, species, age, location, health, temperament, description, addedByName, addedByEmail } = req.body;//sequence is the key

    // req.file is set by multer-storage-cloudinary after uploading to Cloudinary multer response
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const animal = await Animal.create({
      name,
      breed,
      species,
      age: parseFloat(age),
      location,
      health,
      temperament,
      description,
      image: req.file.path,  // Cloudinary URL
      addedBy: {
        name:  addedByName  || "Anonymous",
        email: addedByEmail || "",
      },
    });

    // Send confirmation email if they provided an email
    if (addedByEmail) {
      try {
        await sendAnimalListedEmail({
          toEmail: addedByEmail,
          toName:  addedByName || "Friend",
          animalName: name,
        });
      } catch (emailError) {
        // Don't fail the whole request if email fails
        console.error("Email failed (animal was still saved):", emailError.message);
      }
    }

    res.status(201).json({ success: true, animal });
  } catch (error) {
    console.error("Error creating animal:", error);
    res.status(500).json({ success: false, message: "Failed to add animal", error: error.message });
  }
});

export default router;