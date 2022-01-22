module.exports = {

    friendlyName: 'Save selection.',

    description: 'Save selection id.',

    inputs: {
        id: {
            description: 'The id of the sub_type',
            type: 'number',
            required: true
        }
    },

    exits: {
        redirect: {
            description: '',
            responseType: 'redirect'
        }
    },

    fn: async function (inputs) {
        // session
        this.req.session.subscription = inputs.id;

        throw { redirect: '/subscription/' + inputs.id };
    }
}