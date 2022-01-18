module.exports = {


    friendlyName: 'Find organisation',


    description: 'Find the organisation from the current user.',


    inputs: {
    },


    exits: {

    },

    fn: async function () {
        let org = []
        // find current user with all groups
        let user = await User.findOne({ id: this.req.me.id });

        if (user.organisation.length > 0) {
            // creates an array of objects with the values ID and name
            org.push({ name: user.organisation.name, id: user.organisation.id });
            return org;
        } else {
            throw ("Error in findgrps controller -> check 'api/controllers/api/groups/findgrps.js'.");
        }
    }
};