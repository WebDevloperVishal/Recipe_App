// Import mongoose library for working with MongoDB
import mongoose from "mongoose";

// Create a new recipe data structure (schema)
const recipeSchema = new mongoose.Schema(
    {
        // Recipe title - text field that must be provided
        title: {
            type: String,
            required: true,
        },

        // List of ingredients - each one is text and all are required
        ingredients: [
            {
                type: String,
                required: true,
            },
        ],

        // Cooking instructions - text field that must be provided
        instructions: {
            type: String,
            required: true,
        },

        // Recipe category (like "dessert" or "main course") - text field that must be provided
        category: {
            type: String,
            required: true,
        },

        // URL to a photo of the finished recipe - text field that must be provided
        photoUrl: {
            type: String,
            required: true,
        },

        // How long it takes to cook in minutes - number field that must be provided
        cookingTime: {
            type: String,
            required: true,
        },

        // Link to the user who created this recipe - must be provided
        // References a user stored in the "User" collection
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        // Automatically add createdAt and updatedAt timestamps to each recipe
        timestamps: true,
    });

// Create a model named 'Recipe' based on our recipe structure
const Recipe = mongoose.model('Recipe', recipeSchema);

// Make the Recipe model available to other files that import this one
export default Recipe;