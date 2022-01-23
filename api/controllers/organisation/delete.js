module.exports = {


    friendlyName: 'Delete organisation',


    description: 'Delete a organisation from a user.',


    inputs: {
        id: {
            description: 'The id of the organisation.',
            type: 'number',
            required: true
        },
    },


    exits: {
        success: {
            responseType: 'redirect',
        },
    },


    fn: async function (inputs) {
        // data to the current user
        let userData = await User.findOne({ id: this.req.session.userId }).populate("workingGroups");

        // (1) updates the org from the user to NULL
        let user = await User.updateOne({ id: this.req.session.userId }).set({
            organisation: null,
            admin: null
        });

        // (2) gets the org with empoyees and the subscription
        let org = await Organisation.findOne({ id: inputs.id }).populate("employees").populate('subscription');

        // (3) checks whether the organisation still has employees
        if (org.employees.length === 0) {
            // (4) destroy the org
            await Organisation.destroyOne({ id: inputs.id })

            let groupIds = [];
            if (userData.workingGroups) {
                // get the id's from all workingGroups of the org
                userData.workingGroups.forEach(element => {
                    groupIds.push(element.id);
                });
                console.log("groupIds: " + groupIds);
                // (5) destroy all workingGroups from the org
                await WorkingGroup.destroy(groupIds);
            }

            // (6) destroy the subscription of the org
            await Subscription.destroyOne().where({ id: org.subscription[0].id });

            // TODO Delete content?
        }

        return "/organisation";
    }
};