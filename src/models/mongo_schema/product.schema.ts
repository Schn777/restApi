import mongoose from "mongoose";

// Schéma pour Product
const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, default: null },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, 
  description: { type: String, default: null },
});

// Créer le modèle Product
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
