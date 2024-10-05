import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import AuthenticationFilter from '../middlewares/auth.middleware';

const router = Router();
const filter = new AuthenticationFilter();
router.use('/admin',filter.authHandleUser)
/**
 * @swagger
 * /api/products:
 *   get:
 *     deprecated: true
 *     summary: Retrieves a list of products.
 *     description: Retrieve a list of products from the API. Can be used to populate a list of products in your system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                     type: integer
 *                     example: 1
 *                  name:
 *                     type: string
 *                     example: Software
 *                  price:
 *                     type: float
 *                     example : 12.38$
 *                  description: 
 *                     type: string
 *                     example : "Software sold for 12.38$"
 */
router.get('/products',filter.authFilter, ProductController.getProducts);
/**
 * @swagger
 * /api/new-product:
 *   post:
 *     summary: creates.
 *     description: create a new product by specify the name,description,price and quantity.
 *     responses:
 *       200:
 *         description: product created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  name:
 *                     type: string
 *                     example: rocket
 *                  description:
 *                     type: string
 *                     example: Software
 *                  price:
 *                     type: float
 *                     example : 12.38
 *                  quantity: 
 *                     type: integer
 *                     example : "100"
 */
router.post('/admin/new-product', ProductController.createProduct);
/**
 * @swagger
 * /api/filter-price:
 *   get:
 *     summary: filter.
 *     description: filter product by min price and max price.
 *     responses:
 *       200:
 *         description: product filtered.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  minPrice:
 *                     type: float
 *                     example: 10.00
 *                  maxPrice:
 *                     type: float
 *                     example: 30.00
 */
router.get('/admin/filter-price', ProductController.productPriceFilter);
/**
 * @swagger
 * /api/filter-stock:
 *   get:
 *     summary: filter.
 *     description: filter product by min quantity and max quantity.
 *     responses:
 *       200:
 *         description: product filtered.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  minQte:
 *                     type: integer
 *                     example: 10
 *                  maxQte:
 *                     type: integer
 *                     example: 30
 */
router.get('/admin/filter-stock', ProductController.productStockFilter);
/**
 * @swagger
 * /api/edit-product:
 *   get:
 *     summary: edit a product.
 *     description: modify a product by specifying the name,description,price and quantity .
 *     responses:
 *       200:
 *         description: product updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  name:
 *                     type: string
 *                     example: rocket
 *                  description:
 *                     type: string
 *                     example: Software
 *                  price:
 *                     type: float
 *                     example : 12.38
 *                  quantity: 
 *                     type: integer
 *                     example : "100"
 */
router.put('/admin/edit-product', ProductController.editProduct);
/**
 * @swagger
 * /api/delete-product:
 *   get:
 *     summary: delete a product.
 *     description: delete a product by specifying the id .
 *     responses:
 *       200:
 *         description: product deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                     type: number
 *                     example: 1
 */
router.delete('/admin/delete-product', ProductController.deleteProduct);


export default router;
