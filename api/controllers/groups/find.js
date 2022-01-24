module.exports = {

    friendlyName: 'Find working groups.',

    description: 'Find working groups.',

    inputs: {
    },

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/groups/index'
        }
    },

    fn: async function () {
        sails.log.debug('Find all working groups from the current user.')

        // true if user has a Org
        let hasOrg = false;

        // find current user with all groups
        var user = await User.findOne({ id: this.req.me.id }).populate('adminOf').populate('workingGroups');

        if (user.organisation) {
            hasOrg = true;
        }

        var grps = user.workingGroups;

        sails.log.debug('user:')
        sails.log.debug(user)

        if (!user) {
            throw 'not Found: user'
        }
        return {
            user: user,
            grps: grps,
            hasOrg: hasOrg
        };

    }
}