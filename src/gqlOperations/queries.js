import { gql } from "@apollo/client";

export const GET__ALL_PRODUCTS = gql`
  query GetAllProducts($pagination: PaginationArg) {
    products(pagination: $pagination) {
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
      meta {
        pagination {
          pageCount
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

export const GET_ALL_CATEGORIES = gql`
  query Query {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
export const GET_CATEGORY_BY_ID = gql`
  query CategoryById($categoryId: ID) {
    category(id: $categoryId) {
      data {
        attributes {
          products {
            data {
              id
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
      }
    }
  }
`;
export const GET_PRODUCT_BY_NAME = gql`
  query Product($filters: ProductFiltersInput) {
    products(filters: $filters) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
