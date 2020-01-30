import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Heading} from '@chakra-ui/core';
import {Link, graphql, useStaticQuery} from 'gatsby';

export default function Layout(props) {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const {title, description} = data.site.siteMetadata;
  return (
    <Fragment>
      <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
        <meta name="description" content={description} />
      </Helmet>
      <Box
        minH="100vh"
        maxW="xl"
        mx="auto"
        borderLeftWidth={1}
        borderRightWidth={1}
      >
        <Box
          px="6"
          py="4"
          borderBottomWidth={1}
          as="header"
          position="sticky"
          top={0}
          bg="grey.800"
        >
          <Heading fontSize="xl">
            <Link to="/">{title}</Link>
          </Heading>
        </Box>
        <Box p="6">{props.children}</Box>
      </Box>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
