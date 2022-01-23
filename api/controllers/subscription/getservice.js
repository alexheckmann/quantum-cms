module.exports = {

    friendlyName: 'Get selected service.',

    description: '',

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
        sails.log.debug('action: getservice.js')
        
        // session update
        this.req.session.subscription = inputs.id;
        
        console.log("Session sub: " + this.req.session.subscription);

        throw { redirect: '/checkorder' };
    }
}