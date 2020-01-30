import React from 'react';
import {Box, Flex, Heading, Image, Stack, Text} from '@chakra-ui/core';
import {LIST_SHOES} from '../utils';
import {useQuery} from '@apollo/client';

export default function ShoeList() {
  const {data, loading, error} = useQuery(LIST_SHOES);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Stack spacing="4">
      {data.allShoes.data.map(shoe => (
        <Box key={shoe._id} rounded="lg" borderWidth={1} overflow="hidden">
          <Image objectFit="cover" src={shoe.image} h={250} w="100%" />
          <Box padding="4">
            <Flex align="center" mb="2">
              <Image
                p="1"
                size="5"
                rounded="md"
                src={shoe.brand.logo}
                objectFit="contain"
                bg="white"
                mr="2"
              />
              <Text
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                {shoe.brand.name}
              </Text>
            </Flex>
            <Heading fontSize="xl">{shoe.name}</Heading>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
