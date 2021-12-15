module.exports = {


    friendlyName: 'Update Admin',


    description: 'Changes a user to the admin of an organisation.',


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


    fn: async function ({id}) {
        // update user as admin of his current
        sails.log("Set user: '" + id + "' as admin.")

        var user = await User.findOne({ id: id }).populate('admin');

        var userAdmin = await User.updateOne({ id: id }).set({
            admin: user.organisation
        });

        sails.log.debug("User: " + userAdmin.id + " is now admin.")
        sails.log(userAdmin);

        if (!userAdmin) { throw 'notFound'; }
        return "/organisation";
    }
};