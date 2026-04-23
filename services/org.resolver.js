const axios = require("axios");
const { appConfig } = require("../config/app.config");


const resolveAllMembers = async (orgId) => {
    try {
        console.log(`[NOTIFY] Resolving members for Org: ${orgId} via Auth Service`);
        const headers = { 'service-api-key': appConfig.SERVICE_KEY };
        
        // Correct Internal Route: /api/v1/internal/org/members/:orgId
        // This internal route returns a flat array in 'data' field: { success: true, message: "...", data: [...] }
        const baseUrl = `${appConfig.AUTH_SERVICE_URL}/api/v1/internal/org/members/${orgId}`;

        const response = await axios.get(baseUrl, { headers });
        const allUsers = response?.data?.data || [];

        if (!Array.isArray(allUsers)) {
            console.log(`[NOTIFY] Unexpected response format from Auth service:`, JSON.stringify(response?.data));
            return [];
        }

        console.log(`[NOTIFY] Successfully resolved ${allUsers.length} total users`);
        return allUsers;
    } catch (err) {
        console.log(`[NOTIFY] Error resolving members:`, err.message);
        return [];
    }
}


const resolveMembers = async (orgId) => {
    try {
        const users = await resolveAllMembers(orgId); 

        return users;
    }
    catch(err) {
        console.log(err.message);
        return [];
    }
}



const resolveMembersUsingRoles = async (orgId, roles = []) => {
    try {
        const members = await resolveMembers(orgId);

        if (roles.includes("*") || roles.includes("all")) {
            return members?.map(member => ({ email: member.email, userId: member.userId || member._id }));
        }

        const recipients = members
        ?.filter(member => roles.includes(member.role))
        ?.map(member => ({ email: member?.email, userId: member.userId || member._id }));

        return recipients || [];
    }
    catch(err) {
        console.log(err.message);
        return [];
    }
}


const resolveMembersUsingTeams = async (orgId, teams = []) => {
    try {
        const members = await resolveMembers(orgId);

        if (teams.includes("*") || teams.includes("all")) {
            return members?.map(member => ({ email: member.email, userId: member.userId || member._id }));
        }

        const recipients = members
        ?.filter(member => teams.includes(member?.teamId))
        ?.map(member => ({ email: member?.email, userId: member.userId || member._id }));

        return recipients || [];
    }
    catch(err) {
        console.log(err.message);
        return [];
    }
}


module.exports = { resolveAllMembers, resolveMembers, resolveMembersUsingRoles, resolveMembersUsingTeams };