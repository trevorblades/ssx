require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Skate Shoe Exchange',
    description: 'Trade your old but still-skateable shoes'
  },
  plugins: [
    'gatsby-plugin-chakra-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-theme-apollo',
    {
      resolve: 'gatsby-plugin-emoji-favicon',
      options: {
        emoji: '👟'
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Fauna',
        fieldName: 'fauna',
        url: 'https://graphql.fauna.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_FAUNA_SECRET}`
        }
      }
    }
  ]
};
