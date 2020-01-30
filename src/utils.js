import {gql} from '@apollo/client';

export const SHOE_FRAGMENT = gql`
  fragment ShoeFragment on Shoe {
    _id
    name
    image
    brand {
      name
      logo
    }
  }
`;

export const LIST_SHOES = gql`
  {
    allShoes {
      data {
        ...ShoeFragment
      }
    }
  }
  ${SHOE_FRAGMENT}
`;
