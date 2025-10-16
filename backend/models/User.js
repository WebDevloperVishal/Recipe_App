// Import mongoose library for working with MongoDB
import mongoose from "mongoose";
// Import bcrypt for password security (hashing and comparing passwords)
import bcrypt from "bcryptjs"

// Create a new user data structure (schema)
const userSchema = new mongoose.Schema(
    {
        // Username - text field that must be provided and must be unique
        // No two users can have the same username
        username: {
            type: String,
            required: true,
            unique: true,
        },
        
        // Email - text field that must be provided and must be unique
        // No two users can have the same email
        email: {
            type: String,
            required: true,
            unique: true,
        },
        
        // Password - text field that must be provided
        // This will be stored as a secure hash, not plain text
        password: {
            type: String,
            required: true,
        },
    },
    {
        // Automatically add createdAt and updatedAt timestamps to each user
        timestamps: true,
    }
);

// This special function runs before saving a user to the database
// It automatically encrypts the password for security
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been changed
    if (!this.isModified("password")) return next();
    
    // Create a "salt" - random data that makes each hash unique
    const salt = await bcrypt.genSalt(10);
    
    // Convert the plain password to a secure hash
    this.password = await bcrypt.hash(this.password, salt);
    
    // Continue with the save operation
    next();
});

// Add a method to check if a password is correct
// This lets us verify a user's login attempt
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compare the entered password with the stored hash
    // Returns true if they match, false if they don't
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create a model named 'User' based on our user structure
const User = mongoose.model("User", userSchema);

// Make the User model available to other files that import this one
export default User;