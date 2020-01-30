module.exports = {
  siteMetadata: {
    title: 'Skate Shoe Exchange',
    description: 'Trade your old but still-skateable shoes'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-theme-apollo',
    {
      resolve: 'gatsby-plugin-emoji-favicon',
      options: {
        emoji: '👟'
      }
    }
  ]
};
