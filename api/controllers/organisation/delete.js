module.exports = {


    friendlyName: 'Delete',


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
        let userData = await User.findOne({ id: this.req.session.userId }).populate("workingGroups");

        // updates the org from the user to NULL
        let user = await User.updateOne({ id: this.req.session.userId }).set({
            organisation: null,
            admin: null
        });

        let org = await Organisation.findOne({id: inputs.id}).populate("employees");

        console.log("org: ");
        console.log(org);

        if (org.employees.length === 0) {
            await Organisation.destroyOne({id: inputs.id})
            console.log("Destroyed organisation: " + inputs.id);

            await WorkingGroup.destroy().where(userData.workingGroups.id);

            // TODO Delete content?
        }

        if (user) {
            sails.log("Deleted organisation from user: " + user.id);
            return "/organisation";
        } else {
            sails.log("Can not delelte organisation from user.")
            return "/organisation";
        };
    }
};