import mongoose from "mongoose";
// Schéma pour User
const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  charge: { type: String, default: null },
  isAdmin: { type: Boolean, default: null },
  password: { type: String, required: true },
});

// Créer le modèle User
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
