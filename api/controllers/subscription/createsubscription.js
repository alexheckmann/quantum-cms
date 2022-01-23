module.exports = {

    friendlyName: 'Create a subscription.',

    description: '',

    inputs: {
        id: {
            description: 'The id of the sub_type',
            type: 'number',
        }
    },

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/subscription/show'
        }
    },

    fn: async function (inputs) {
        sails.log.debug('action: createsubscription.js')

        let sub;
        // find current user
        let user = await User.findOne({ id: this.req.me.id }).populate('organisation');
        sails.log.debug(user);
        // find org to the user
        let org = await Organisation.findOne({ id: user.organisation.id }).populate('subscription');
        sails.log.debug(org);

        // (1) Org has a subscription -> remove and create a new one
        if (org.subscription.length > 0) {
            // if old subType != new subType
            sails.log.debug("org.subscription.subType: " + org.subscription[0].subType);
            sails.log.debug("inputs.id: " + inputs.id);
            sails.log.debug("org.subscription.subType !== inputs.id: " + org.subscription[0].subType !== inputs.id)
            if (org.subscription[0].subType !== inputs.id) {
                // destroy the old sub
                await Subscription.destroyOne().where({ id: org.subscription[0].id });
                sails.log.debug("destroyed old sub");
            } else {
                // new sub = old sub -> no change -> return old sub
                sub = await Subscription.findOne({ id: org.subscription[0].id }).populate('subType');
                sails.log.debug(sub);
                if (sub) {
                    return {
                        message: 'Subscription is already booked, no changes have been made.',
                        subscription: sub
                    }
                } else {
                    throw ('Error: no subscription created.')
                }
            }
        }

        // (2) Org has no subscription -> create a new one

        // data for a new sub to the org
        let subscription = {
            status: 'active',
            subType: inputs.id,
            organisation: user.organisation.id
        }
        // create the new sub
        subscription = await Subscription.create(subscription).fetch();
        // get the new sub with subType
        sub = await Subscription.findOne({ id: subscription.id }).populate('subType');

        sails.log.debug(sub);

        if (sub) {
            return {
                message: 'Subscription succesfully booked.',
                subscription: sub
            }
        } else {
            throw ('Error: no subscription created.')
        }
    }
}