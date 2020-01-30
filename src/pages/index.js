import Layout from '../components/layout';
import NoSSR from '@mpth/react-no-ssr';
import React from 'react';
import ShoeList from '../components/shoe-list';
import {Button, Flex, Heading} from '@chakra-ui/core';
import {Link} from 'gatsby';

export default function Index() {
  return (
    <Layout>
      <Flex mb="4" align="center" justify="space-between">
        <Heading>All shoes</Heading>
        <Button as={Link} to="/create">
          Add new shoe
        </Button>
      </Flex>
      <NoSSR>
        <ShoeList />
      </NoSSR>
    </Layout>
  );
}
