import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import AuthenticationFilter from '../middlewares/auth.middleware';

const router = Router();
const filter = new AuthenticationFilter();
router.use('/admin', filter.authHandleUser);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products.
 *     description: Returns a list of products including ID, name, description, category, available quantity, and price. Allows filtering by price and quantity.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price for filtering products.
 *         example: 10.00
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price for filtering products.
 *         example: 30.00
 *       - in: query
 *         name: minStock
 *         schema:
 *           type: integer
 *         description: Minimum stock quantity for filtering products.
 *         example: 10
 *       - in: query
 *         name: maxStock
 *         schema:
 *           type: integer
 *         description: Maximum stock quantity for filtering products.
 *         example: 100
 *     responses:
 *       200:
 *         description: Successfully retrieved list of products.
 *       400:
 *         description: Invalid request.
 */
router.get('/products', filter.authFilter, ProductController.getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product.
 *     description: Allows the creation of a new product by providing the name, description, price, and quantity. Validates input data.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product (3-50 characters).
 *                 example: "Rocket"
 *               description:
 *                 type: string
 *                 description: Description of the product.
 *                 example: "High-performance rocket software."
 *               price:
 *                 type: number
 *                 description: Price of the product (must be a positive number).
 *                 example: 12.38
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product (must be a positive integer).
 *                 example: 100
 *     responses:
 *       201:
 *         description: Successfully created new product.
 *       400:
 *         description: Data validation errors.
 *       401:
 *         description: Unauthorized user.
 */
router.post('/admin/products', ProductController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product.
 *     description: Allows modifying an existing product's name, description, price, or quantity. Returns 404 if the product does not exist.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the product.
 *                 example: "Updated Rocket"
 *               description:
 *                 type: string
 *                 description: Updated description of the product.
 *                 example: "Updated high-performance rocket software."
 *               price:
 *                 type: number
 *                 description: Updated price of the product.
 *                 example: 15.00
 *               quantity:
 *                 type: integer
 *                 description: Updated quantity of the product.
 *                 example: 120
 *     responses:
 *       200:
 *         description: Successfully updated product.
 *       400:
 *         description: Validation errors.
 *       404:
 *         description: Product not found.
 */
router.put('/admin/products/:id', ProductController.editProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product.
 *     description: Deletes a product from the catalog by its ID. Returns 404 if the product does not exist.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted product.
 *       404:
 *         description: Product not found.
 *       401:
 *         description: Unauthorized user.
 */
router.delete('/admin/products/:id', ProductController.deleteProduct);

export default router;
