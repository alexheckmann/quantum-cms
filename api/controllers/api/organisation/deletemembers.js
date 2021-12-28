module.exports = {

    friendlyName: 'Delete Members',

    description: '',

    inputs: {
        members: {
            type: 'ref',
            required: true
        }
    },

    exits: {
        redirect: {
            responseType: 'redirect',
            description: 'Requesting user is logged in, so redirect to the internal welcome page.'
        },
    },


    fn: async function (inputs) {
        sails.log("Deletemembers.js inputs: " + inputs.members);

        var updatedUsers = await User.update({
            id: inputs.members
        }).set({
            organisation: null,
            admin: null
        }).fetch();

        sails.log("Deleted members.");
        sails.log(updatedUsers);

        throw { redirect: '/organisation' };
    }
};