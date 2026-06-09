import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    breed:       { type: String, required: true, trim: true },
    species:     { type: String, required: true, enum: ["Dog", "Cat", "Bird", "Other"] },
    age:         { type: Number, required: true, min: 0 },
    location:    { type: String, required: true, trim: true },
    health:      { type: String, required: true, trim: true },
    temperament: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image:       { type: String, required: true },   // Cloudinary URL
    
    addedBy: {
  name: { type: String,required:true },
  email: {
    type: String,
    required:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
},
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export const Animal = mongoose.model("Animal", animalSchema); //  we have created a model Animal using animalschema

//Animal.create (add new record)