module.exports = {

    friendlyName: 'Appoint Admin',

    description: 'Appoints a member of a organisation as admin.',

    inputs: {
        members: {
            type: 'ref',
            required: true
        }
    },

    exits: {
    },


    fn: async function (inputs) {
        // update users as admin
        var user = await User.findOne({ id: this.req.session.userId }).populate('admin');

        // set the selected members as admin of the org from the current user
        await User.update({
            id: inputs.members
        }).set({
            admin: user.organisation
        });
        return true;
    }
};