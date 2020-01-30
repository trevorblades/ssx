import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Button, Flex, Heading, useColorMode} from '@chakra-ui/core';
import {Link, graphql, useStaticQuery} from 'gatsby';

export default function Layout(props) {
  const {colorMode} = useColorMode();
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
        maxW="2xl"
        mx="auto"
        borderLeftWidth={1}
        borderRightWidth={1}
      >
        <Flex
          align="center"
          justify="space-between"
          px="6"
          py="3"
          borderBottomWidth={1}
          as="header"
          position="sticky"
          top={0}
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        >
          <Heading fontSize="2xl">
            <Link to="/">👟 {title}</Link>
          </Heading>
          <Button size="sm" as={Link} to="/new">
            Add new shoe
          </Button>
        </Flex>
        <Box p="6">{props.children}</Box>
      </Box>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
