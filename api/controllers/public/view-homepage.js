module.exports = {


  friendlyName: 'View homepage',


  description: 'Display homepage.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/public/homepage'
    }

  },


  fn: async function (inputs, exits) {

    // if user is logged in, return public layout since the dropdown won't work without bootstrap.js & jquery,
    // which is not included in landingpage-layout.ejs
    if (this.req.me) {
      return exits.success({layout: 'layouts/public-layout'});
    }
    // Respond with optimized layout for public visitors to push search engine performance
    return exits.success({layout: 'layouts/landingpage-layout'});

  }


};
