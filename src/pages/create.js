import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Button, Heading, Input, Select, Stack} from '@chakra-ui/core';
import {graphql} from 'gatsby';

export default function Create(props) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Layout>
      <Heading mb="4">Add a shoe</Heading>
      <Stack as="form" onSubmit={handleSubmit} spacing="4">
        <Input
          isRequired
          placeholder="What is your shoe called?"
          type="text"
          name="name"
        />
        <Select placeholder="Select a brand" name="brand" isRequired>
          {props.data.fauna.allBrands.data.map(brand => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Submit</Button>
      </Stack>
    </Layout>
  );
}

Create.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    fauna {
      allBrands {
        data {
          _id
          name
        }
      }
    }
  }
`;
