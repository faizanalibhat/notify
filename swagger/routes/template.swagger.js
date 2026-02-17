/**
 * @swagger
 * tags:
 *   name: Template
 *   description: Notification template management
 */

/**
 * @swagger
 * /notify/api/template/{id}/test:
 *   post:
 *     summary: Test a template by ID
 *     tags: [Template]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Template ID (slug) to test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               context:
 *                 type: object
 *                 description: Dynamic context data for the template
 *               recievers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of recipient email addresses
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slug:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Template not found
 *       500:
 *         description: Internal Server Error
 */
