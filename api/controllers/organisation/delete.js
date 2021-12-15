module.exports = {


    friendlyName: 'Delete',


    description: 'Delete a organisation from a user.',


    inputs: {
        id: {
            description: 'The id of the user.',
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
        // updates the org from the user to NULL
        sails.log.debug("Delete organisation from user: " + inputs.id)

        let user = await User.updateOne({ id: inputs.id }).set({
            organisation: null,
            admin: null
        });

        if (user) {
            sails.log("Deleted organisation from user: " + user.id);
            return "/organisation";
        } else {
            sails.log("Can not delelte organisation from user: " + user.id)
            return "/organisation";
        };
    }
};