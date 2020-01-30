import React from 'react';
import {gql, useQuery} from '@apollo/client';

const LIST_SHOES = gql`
  {
    allShoes {
      data {
        _id
        name
        image
        brand {
          name
          logo
        }
      }
    }
  }
`;

export default function ShoeList() {
  const {data, loading, error} = useQuery(LIST_SHOES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {data.allShoes.data.map(shoe => (
        <li key={shoe._id}>
          {shoe.brand.name} - {shoe.name}
        </li>
      ))}
    </ul>
  );
}
