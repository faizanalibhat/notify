const axios = require("axios");


const resolveMembers = async (orgId) => {
    try {
        const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/org/members?orgId=${orgId}`, {
            method: "GET",
            headers: { 'service-api-key': process.env.SERVICE_KEY }
        });

        const users = response?.data;

        if (!Array.isArray(users)) {
            return { code: 400, status: "failed", message: "failed to resolve members" };
        }

        return users;
    }
    catch(err) {
        console.log(err.message);
        return { code: 400, status: "failed", message: "failed to resolve members" };
    }
}



const resolveMembersUsingRoles = async (orgId, roles = []) => {
    const members = await resolveMembers(orgId);

    if (roles.includes("*") || roles.includes("all")) return members;

    const recipients = members
    ?.filter(member => roles.includes(member.role))
    ?.map(member => ({ email: member?.email }));

    return recipients || [];
}


const resolveMembersUsingTeams = async (orgId, teams = []) => {
    const members = await resolveMembers(orgId);

    if (teams.includes("*") || teams.includes("all")) return members;

    const recipients = members
    ?.filter(member => teams.includes(member?.teamId))
    ?.map(member => ({ email: member?.email }));

    return recipients || [];
}


module.exports = { resolveMembers, resolveMembersUsingRoles, resolveMembersUsingTeams };