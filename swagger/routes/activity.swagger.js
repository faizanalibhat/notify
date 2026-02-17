/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Activity and Audit Log operations
 */

/**
 * @swagger
 * /notify/api/activity/bulk:
 *   get:
 *     summary: List all activities
 *     tags: [Activity]
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
 * /notify/internal/activity/{orgId}:
 *   get:
 *     summary: Get organizational activity with stats (Internal)
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: orgId
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal Server Error
 */
