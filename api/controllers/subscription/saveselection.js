module.exports = {

    friendlyName: 'Save selection.',

    description: 'save selection id.',

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
            responseCode: 301,
            responseType: 'redirect'
        }
    },

    fn: async function (inputs) {
        sails.log.debug('action: saveselection.js')
        // session
        this.req.session.subscription = inputs.id;

        throw { 
            redirect: '/subscription/'+inputs.id
        };
    }
}