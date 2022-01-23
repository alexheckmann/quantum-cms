module.exports = {

    friendlyName: 'Get selection.',

    description: 'Get selection.',

    inputs: {
        id: {
            description: 'The id of the sub_type',
            type: 'number',
            required: true
        }
    },

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/subscription/select'
        }
    },

    fn: async function (inputs) {
        sails.log.debug('action: getselection.js')

        let isAdmin = false;

        // gets the current user
        let user = await User.findOne({ id: this.req.session.userId }).populate('organisation');

        
        if (!!user.organisation) {
            // check if user is admin       
            if (user.organisation.id == user.admin) {
                isAdmin = true;
                sails.log.debug('isAdmin ' + isAdmin)
            } else {
                sails.log.debug('isAdmin ' + isAdmin)
            }

            // gets the organisation to the current user
            let org = await Organisation.findOne({ id: user.organisation.id }).populate('subscription');

            return {
                subId: this.req.session.subscription,
                org: org,
                isAdmin: isAdmin
            };

        } else {
            sails.log.debug('User has no organisation.')
            return {
                message: "User has no organisation.",
                subId: this.req.session.subscription,
                org: false,
                isAdmin: isAdmin
            };
        }
    }
}