/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management
 */

/**
 * @swagger
 * /notify/api/notification/bulk:
 *   get:
 *     summary: List all notifications for the authenticated user
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /notify/api/notification/{id}/seen:
 *   post:
 *     summary: Mark a specific notification as seen
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /notify/api/notification/seen:
 *   post:
 *     summary: Mark all notifications as seen
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /notify/api/notification/test:
 *   post:
 *     summary: Send a test email notification
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
