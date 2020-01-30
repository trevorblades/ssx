import Layout from '../components/layout';
import NoSSR from '@mpth/react-no-ssr';
import React from 'react';
import ShoeList from '../components/shoe-list';
import {Heading} from '@chakra-ui/core';

export default function Index() {
  return (
    <Layout>
      <Heading mb="4">All shoes</Heading>
      <NoSSR>
        <ShoeList />
      </NoSSR>
    </Layout>
  );
}
