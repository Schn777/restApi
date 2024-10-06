import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticates a user based on email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: User's password.
 *               email:
 *                 type: string
 *                 description: User's email address.
 *     responses:
 *       200:
 *         description: Successful authentication.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.post('/auth', AuthController.Authenticate);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with email, password, name, and role.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               role:
 *                 type: string
 *                 description: User's role (e.g., employe or gestionnaire).
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       201:
 *         description: Successfully registered new user.
 *       400:
 *         description: Bad request (e.g., invalid data).
 *       409:
 *         description: Conflict (email already exists).
 *       500:
 *         description: Internal server error.
 */
router.post('/register', AuthController.Register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Retrieve existing user
 *     description: Logs in a user with email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Successfully logged in the user.
 *       400:
 *         description: Bad request (e.g., invalid data).
 *       401:
 *         description: Unauthorized (invalid credentials).
 *       500:
 *         description: Internal server error.
 */
router.post('/login', AuthController.Authenticate);

export default router;
