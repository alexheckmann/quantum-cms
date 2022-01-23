module.exports = {

    friendlyName: 'Get selected service.',

    description: '',

    inputs: {
    },

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/subscription/checkorder'
        }
    },

    fn: async function (inputs) {
        sails.log.debug('action: checkorder.js')

        // sub_type
        let subType = await SubType.findOne({ id: this.req.session.subscription });

        sails.log.debug(subType);

       return {
           subType: subType
       }
    }
}