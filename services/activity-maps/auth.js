const AUTH_BASE_PATH = '/api';

module.exports = {
    // Auth Routes
    [`${AUTH_BASE_PATH}/auth/register`]: { 'POST': 'Registered a new user' },
    [`${AUTH_BASE_PATH}/auth/register/[^/]+`]: { 'POST': 'Registered with invite' },
    [`${AUTH_BASE_PATH}/auth/create-user`]: { 'POST': 'Created a user (Admin)' },
    [`${AUTH_BASE_PATH}/auth/login`]: { 'POST': 'Logged in' },
    [`${AUTH_BASE_PATH}/auth/confirm-login`]: { 'POST': 'Confirmed login (2FA)' },
    [`${AUTH_BASE_PATH}/auth/verify-otp`]: { 'POST': 'Verified OTP' },
    [`${AUTH_BASE_PATH}/auth/resend-verify-otp`]: { 'POST': 'Resent verification OTP' },
    [`${AUTH_BASE_PATH}/auth/refresh-token`]: { 'POST': 'Refreshed access token' },
    [`${AUTH_BASE_PATH}/auth/reset`]: { 'POST': 'Requested password reset' },
    [`${AUTH_BASE_PATH}/auth/reset/validate-token`]: { 'POST': 'Validated reset token' },
    [`${AUTH_BASE_PATH}/auth/reset-password`]: { 'POST': 'Reset password' },
    [`${AUTH_BASE_PATH}/auth/profile`]: {
        // 'GET': 'Viewed profile',
        // 'PUT': 'Updated profile'
    },
    [`${AUTH_BASE_PATH}/auth/change-password`]: { 'POST': 'Changed password' },
    [`${AUTH_BASE_PATH}/auth/change-email`]: { 'POST': 'Changed email' },
    [`${AUTH_BASE_PATH}/auth/account`]: { 'DELETE': 'Deleted account' },
    [`${AUTH_BASE_PATH}/auth/deactivate`]: { 'POST': 'Deactivated account' },
    // [`${AUTH_BASE_PATH}/auth/notifications`]: { 'GET': 'Viewed notifications' },
    // [`${AUTH_BASE_PATH}/auth/activity`]: { 'GET': 'Viewed activity log' },
    // [`${AUTH_BASE_PATH}/auth/loadDemoData`]: { 'GET': 'Loaded demo data' },
    // [`${AUTH_BASE_PATH}/auth/removeDemoData`]: { 'GET': 'Removed demo data' },
    // [`${AUTH_BASE_PATH}/auth/checkInvite/[^/]+`]: { 'GET': 'Checked invite validity' },
    // [`${AUTH_BASE_PATH}/auth/user/[^/]+`]: { 'GET': 'Viewed user details' },
    [`${AUTH_BASE_PATH}/auth/update-role/[^/]+`]: { 'POST': 'Updated user role' },
    [`${AUTH_BASE_PATH}/auth/update-team/[^/]+`]: { 'POST': 'Updated user team' },
    // [`${AUTH_BASE_PATH}/auth/unlock-inactive`]: { 'POST': 'Unlocked inactive accounts' },
    // [`${AUTH_BASE_PATH}/auth/user-by-email/[^/]+`]: { 'GET': 'Viewed user by email' },
    // [`${AUTH_BASE_PATH}/auth/join`]: {
    //     'GET': 'Checked join link',
    //     'POST': 'Registered with join link'
    // },
    [`${AUTH_BASE_PATH}/auth/join/[^/]+`]: { 'GET': 'Checked join link token' },
    [`${AUTH_BASE_PATH}/auth/approval-status`]: { 'POST': 'Checked approval status' },
    [`${AUTH_BASE_PATH}/auth/profile-picture`]: {
        // 'GET': 'Viewed profile picture',
        'POST': 'Uploaded profile picture'
    },
    // [`${AUTH_BASE_PATH}/auth/users-by-emails`]: { 'GET': 'Viewed users by emails' },

    // Org Routes
    // [`${AUTH_BASE_PATH}/org/check`]: { 'GET': 'Checked login status' },
    // [`${AUTH_BASE_PATH}/org/apikey/validate`]: { 'GET': 'Validated API key' },
    [`${AUTH_BASE_PATH}/org`]: {
        'GET': 'Viewed organization details',
        // 'POST': 'Created organization',
        // 'PUT': 'Updated organization'
    },
    [`${AUTH_BASE_PATH}/org/rotateKey`]: { 'GET': 'Rotated API key' },
    // [`${AUTH_BASE_PATH}/org/internal/connect`]: { 'POST': 'Stored internal connector' },
    // [`${AUTH_BASE_PATH}/org/internal/store`]: { 'POST': 'Stored scan data' },
    [`${AUTH_BASE_PATH}/org/[^/]+/admins-supers`]: { 'GET': 'Listed admins and supers' },
    [`${AUTH_BASE_PATH}/org/members`]: { 'GET': 'Listed organization members' },
    [`${AUTH_BASE_PATH}/org/members/[^/]+`]: { 'DELETE': 'Removed member' },
    [`${AUTH_BASE_PATH}/org/members/invite`]: { 'POST': 'Invited member' },
    [`${AUTH_BASE_PATH}/org/members/access`]: { 'PUT': 'Updated member access' },
    [`${AUTH_BASE_PATH}/org/members/latest-logins`]: { 'GET': 'Viewed latest logins' },
    [`${AUTH_BASE_PATH}/org/assets`]: {
        'POST': 'Marked asset as important',
        'GET': 'Listed assets'
    },
    [`${AUTH_BASE_PATH}/org/asset-store`]: { 'POST': 'Stored asset' },
    [`${AUTH_BASE_PATH}/org/asset-detail`]: { 'GET': 'Viewed asset detail' },
    [`${AUTH_BASE_PATH}/org/asset-detail/[^/]+`]: { 'GET': 'Viewed asset detail for org' },
    [`${AUTH_BASE_PATH}/org/admin`]: { 'GET': 'Listed all organizations' },
    // [`${AUTH_BASE_PATH}/org/access-request`]: { 'POST': 'Requested organization access' },
    [`${AUTH_BASE_PATH}/org/join-link`]: {
        'POST': 'Created join link',
        // 'GET': 'Viewed join link'
    },
    [`${AUTH_BASE_PATH}/org/join-link/refresh`]: { 'POST': 'Refreshed join link' },
    [`${AUTH_BASE_PATH}/org/join-link/disable`]: { 'POST': 'Disabled join link' },
    [`${AUTH_BASE_PATH}/org/pending-registrations`]: { 'GET': 'Listed pending registrations' },
    [`${AUTH_BASE_PATH}/org/process-registration`]: { 'POST': 'Processed registration' },
    [`${AUTH_BASE_PATH}/org/security-preferences`]: {
        'GET': 'Viewed security preferences',
        'PUT': 'Updated security preferences'
    },
    [`${AUTH_BASE_PATH}/org/license-expiry`]: { 'PUT': 'Updated license expiry' },
    [`${AUTH_BASE_PATH}/org/[^/]+`]: { 'GET': 'Viewed organization by ID' },

    // Department Routes
    [`${AUTH_BASE_PATH}/org/departments`]: {
        'GET': 'Listed departments',
        'POST': 'Created department'
    },
    [`${AUTH_BASE_PATH}/org/departments/[^/]+`]: {
        'GET': 'Viewed department',
        'PATCH': 'Updated department',
        'DELETE': 'Deleted department'
    },
    [`${AUTH_BASE_PATH}/org/departments/[^/]+/teams`]: {
        'GET': 'Listed department teams',
        'POST': 'Added team to department'
    },
    [`${AUTH_BASE_PATH}/org/departments/[^/]+/team/[^/]+`]: { 'DELETE': 'Removed team from department' },

    // Team Routes
    [`${AUTH_BASE_PATH}/teams`]: {
        'GET': 'Listed teams',
        'POST': 'Created team'
    },
    [`${AUTH_BASE_PATH}/teams/[^/]+`]: {
        'GET': 'Viewed team',
        'PATCH': 'Updated team',
        'DELETE': 'Deleted team'
    },
    [`${AUTH_BASE_PATH}/teams/[^/]+/lead/[^/]+`]: { 'PATCH': 'Changed team lead' },
    [`${AUTH_BASE_PATH}/teams/[^/]+/members`]: { 'POST': 'Added members to team' },

    // Business Unit Routes
    [`${AUTH_BASE_PATH}/business-unit`]: {
        'GET': 'Listed business units',
        'POST': 'Created business unit'
    },
    [`${AUTH_BASE_PATH}/business-unit/[^/]+`]: {
        'GET': 'Viewed business unit',
        'PUT': 'Updated business unit',
        'DELETE': 'Deleted business unit'
    }
};
