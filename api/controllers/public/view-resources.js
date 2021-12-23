module.exports = {


  friendlyName: 'View resources',


  description: 'Display "resources" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/resources'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
