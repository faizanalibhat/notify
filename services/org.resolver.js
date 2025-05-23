const axios = require("axios");


const resolveAllMembers = async (orgId) => {
    try {

        const base = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/org/members?orgId=${orgId}&page=1&limit=1`, {
            method: "GET",
            headers: { 'service-api-key': process.env.SERVICE_KEY }
        });

        let total = base?.data?.data?.total || 0;
        let limit = 50;

        let pages = Math.ceil(total/limit);

        let allUsers = [];

        while (pages > 0) {
            try {
                let resp = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/org/members?orgId=${orgId}&page=${pages}&limit=${limit}`, {
                    method: "GET",
                    headers: { 'service-api-key': process.env.SERVICE_KEY }
                });

                pages -= 1;

                // users
                let users = resp?.data?.data?.members;

                users = Array.isArray(users) ? users : [];

                allUsers.push(...users);
            }
            catch(err) {
                console.log(err.message);
                pages -= 1;
            }
        }

        return allUsers || [];
    }
    catch(err) {
        console.log(err.message);
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

        if (roles.includes("*") || roles.includes("all")) return members?.map(member => ({ email: member.email }));

        const recipients = members
        ?.filter(member => roles.includes(member.role))
        ?.map(member => ({ email: member?.email }));

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

        if (teams.includes("*") || teams.includes("all")) return members?.map(member => ({ email: member.email }));

        const recipients = members
        ?.filter(member => teams.includes(member?.teamId))
        ?.map(member => ({ email: member?.email }));

        return recipients || [];
    }
    catch(err) {
        console.log(err.message);
        return [];
    }
}


module.exports = { resolveMembers, resolveMembersUsingRoles, resolveMembersUsingTeams };