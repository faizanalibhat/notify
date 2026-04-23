/**
 * Pluggable Authentication Middleware with Role-Based Access Control (RBAC)
 *
 * This middleware provides flexible authentication using the adapter/strategy pattern
 * and supports role-based authorization.
 *
 * @example
 * // Simple JWT auth
 * app.get("/profile", auth({ mode: "jwt" }), handler);
 *
 * @example
 * // Admin only route
 * app.get("/admin", auth({ mode: "jwt", roles: ["Admin", "Super"] }), handler);
 *
 * @example
 * // Multiple auth modes (try JWT first, then API key)
 * app.get("/api/data", auth({ mode: ["jwt", "api_key"] }), handler);
 *
 * @example
 * // Optional auth (public route with optional user context)
 * app.get("/feed", auth({ mode: "jwt", optional: true }), handler);
 */

const jwtStrategy = require("./strategies/jwt.strategy");
const apiKeyStrategy = require("./strategies/apiKey.strategy");
const internalStrategy = require("./strategies/internal.strategy");
const intermediaryStrategy = require("./strategies/intermediary.strategy");

const strategies = {
	jwt: jwtStrategy,
	api_key: apiKeyStrategy,
	internal: internalStrategy,
	intermediary: intermediaryStrategy,
};

/**
 * Standard roles hierarchy (highest to lowest)
 * Super > Admin > Manager > Member
 */
const ROLE_HIERARCHY = ["Super", "Admin", "Manager", "Developer", "Auditor", "Member"];

/**
 * Authentication middleware factory
 *
 * @param {Object} options - Configuration options
 * @param {string|string[]} options.mode - Authentication mode(s): "jwt", "api_key", "internal"
 * @param {string[]} [options.roles=[]] - Allowed roles for authorization
 * @param {boolean} [options.optional=false] - If true, allows unauthenticated requests
 * @param {boolean} [options.skipActivityLog=false] - If true, skips activity logging for JWT
 * @returns {Function} Express middleware function
 */
function auth(options = {}) {
	const { mode, roles = [], optional = false } = options;

	if (!mode) {
		throw new Error("Auth mode is required");
	}

	const modes = Array.isArray(mode) ? mode : [mode];

	// Validate modes
	for (const m of modes) {
		if (!strategies[m]) {
			throw new Error(`Unknown auth mode: ${m}`);
		}
	}

	return async function authMiddleware(req, res, next) {
		let lastError;

		for (const m of modes) {
			const strategy = strategies[m];

			try {
				const authResult = await strategy.execute(req, options);

				// ROLE CHECK
				if (roles.length > 0) {
					const userRole = authResult?.user?.role;

					if (!userRole) {
						return res.status(403).json({
							success: false,
							error: "Forbidden: user role not found",
						});
					}

					if (!roles.includes(userRole)) {
						return res.status(403).json({
							success: false,
							error: "Forbidden: insufficient role",
						});
					}
				}

				// Attach auth context to request
				req.auth = authResult;
				req.user = authResult.user;
				// Maintain backward compatibility
				req.authenticatedService = authResult.user;

				// For internal service requests
				if (authResult.service_req) {
					req.service_req = true;
				}

				return next();
			} catch (err) {
				lastError = err;
				// Continue to next strategy
			}
		}

		// All strategies failed
		if (optional) {
			// Optional auth - proceed without authentication
			return next();
		}

		// Return error with details if available
		console.error("Authentication failed:", lastError?.message);

		const errorResponse = {
			success: false,
			error: lastError?.message || "Unauthorized",
		};

		// Add license expiry info for license errors
		if (lastError?.code === "LICENSE_EXPIRED") {
			errorResponse.errorCode = "LICENSE_EXPIRED";
			errorResponse.licenseExpiry = lastError.licenseExpiry;
		}

		return res.status(401).json(errorResponse);
	};
}

/**
 * Helper: Check if a role has access based on hierarchy
 * @param {string} userRole - User's role
 * @param {string} requiredRole - Minimum required role
 * @returns {boolean}
 */
function hasRoleAccess(userRole, requiredRole) {
	const userIndex = ROLE_HIERARCHY.indexOf(userRole);
	const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole);

	if (userIndex === -1 || requiredIndex === -1) {
		return false;
	}

	// Lower index = higher privilege
	return userIndex <= requiredIndex;
}

/**
 * Convenience middleware: Requires at least Admin role
 */
const requireAdmin = auth({
	mode: ["internal", "jwt", "api_key"],
	roles: ["Super", "Admin"],
});

/**
 * Convenience middleware: Requires at least Member role
 */
const requireMember = auth({
	mode: ["internal", "jwt", "api_key"],
	roles: ["Super", "Admin", "Manager", "Member", "Developer"],
});

/**
 * Convenience middleware: Any authenticated user
 */
const requireAuth = auth({
	mode: ["internal", "jwt", "api_key"],
});

/**
 * Convenience middleware: Optional authentication
 */
const optionalAuth = auth({
	mode: ["jwt", "api_key"],
	optional: true,
});

const serviceAuthMiddleware = auth({
	mode: ["internal", "jwt", "api_key"],
	requiredOrgAccess: "ASM",
	activityOrigin: "notify",
});

/**
 * Convenience middleware: Authenticate service (backward compatibility)
 */
const authenticateService = () => serviceAuthMiddleware;

module.exports = auth;
module.exports.ROLE_HIERARCHY = ROLE_HIERARCHY;
module.exports.hasRoleAccess = hasRoleAccess;
module.exports.requireAdmin = requireAdmin;
module.exports.requireMember = requireMember;
module.exports.requireAuth = requireAuth;
module.exports.optionalAuth = optionalAuth;
module.exports.authenticateService = authenticateService;
