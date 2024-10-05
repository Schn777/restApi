import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/handle:
 *   post:
 *     summary: Handle user
 *     description: specify the email you want to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user@example.com
 *               name:
 *                 type: string
 *                 description: User's name
 *               charge:
 *                 type: string
 *                 description: User's function
 *     responses:
 *       200:
 *         description: Successful authentication
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/handle', userController.updateUser);

export default router;