module.exports = {

    friendlyName: 'Get selection.',

    description: '',

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

        // gets the current user
        let user = await User.findOne({ id: this.req.session.userId }).populate('organisation');

        if (!!user.organisation) {
            // gets the organisation to the current user
            let org = await Organisation.findOne({ id: user.organisation.id }).populate('subscriptions');

            return {
                subId: this.req.session.subscription,
                org: org,
            };

        } else {
            sails.log.debug('User has no organisation.')
            return {
                message: "User has no organisation.",
            };
        }
    }
}