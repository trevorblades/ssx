import Layout from '../components/layout';
import NoSSR from '@mpth/react-no-ssr';
import React from 'react';
import ShoeList from '../components/shoe-list';
import {graphql, useStaticQuery} from 'gatsby';

export default function Index() {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <Layout>
      <h1>{data.site.siteMetadata.title}</h1>
      <NoSSR>
        <ShoeList />
      </NoSSR>
    </Layout>
  );
}
