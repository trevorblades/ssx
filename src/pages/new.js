import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Button, Heading, Input, Select, Stack, Text} from '@chakra-ui/core';
import {LIST_SHOES, SHOE_FRAGMENT} from '../utils';
import {gql, useMutation} from '@apollo/client';
import {graphql, navigate} from 'gatsby';

const CREATE_SHOE = gql`
  mutation CreateShoe($name: String!, $image: String!, $brand: ID!) {
    createShoe(data: {name: $name, image: $image, brand: {connect: $brand}}) {
      ...ShoeFragment
    }
  }
  ${SHOE_FRAGMENT}
`;

export default function New(props) {
  const [uploading, setUploading] = useState(false);
  const [createShoe, {loading, error}] = useMutation(CREATE_SHOE, {
    update(cache, {data}) {
      try {
        const {allShoes} = cache.readQuery({
          query: LIST_SHOES
        });

        cache.writeQuery({
          query: LIST_SHOES,
          data: {
            allShoes: {
              ...allShoes,
              data: [...allShoes.data, data.createShoe]
            }
          }
        });
      } catch (error) {
        // do nothing
      }
    },
    onCompleted() {
      navigate('/');
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const {name, brand, image} = event.target;

    const body = new FormData();
    body.append('image', image.files[0]);

    setUploading(true);

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      body,
      headers: {
        Authorization: `Client-ID ${process.env.GATSBY_IMGUR_CLIENT_ID}`
      }
    });

    if (response.ok) {
      const {data} = await response.json();
      createShoe({
        variables: {
          name: name.value,
          image: data.link,
          brand: brand.value
        }
      });
    }

    setUploading(false);
  }

  return (
    <Layout>
      <Heading mb="4">Add a shoe</Heading>
      <Stack as="form" onSubmit={handleSubmit} spacing="4">
        {error && <Text>{error.message}</Text>}
        <Input isRequired placeholder="What is your shoe called?" name="name" />
        <Input isRequired type="file" name="image" />
        <Select placeholder="Select a brand" name="brand" isRequired>
          {props.data.fauna.allBrands.data.map(brand => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </Select>
        <Button
          isLoading={loading || uploading}
          loadingText="Submitting"
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </Layout>
  );
}

New.propTypes = {
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
