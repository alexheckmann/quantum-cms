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

        // find current user with all groups
        var user = await User.findOne({ id: this.req.me.id }).populate('adminOf').populate('workingGroups');

        var grps = user.workingGroups;

        sails.log.debug('user:')
        sails.log.debug(user)

        if (!user) {
            throw 'not Found: user'
        }
        return {
            user: user,
            grps: grps
        };

    }
}