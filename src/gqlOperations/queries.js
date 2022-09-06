import { gql } from "@apollo/client";

export const GET__ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      data {
        id
        attributes {
          name
          price
          description
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID) {
    product(id: $productId) {
      data {
        attributes {
          name
          description
          price
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
