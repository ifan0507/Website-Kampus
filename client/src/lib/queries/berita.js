import gql from 'graphql-tag'

export const BeritaQuery = gql`
  query BeritaQuery($name: String!) {
    beritas(where: { name: $name }) {
      edges {
        node {
          id
          title
          slug
          content
        }
      }
    }
  }
`
