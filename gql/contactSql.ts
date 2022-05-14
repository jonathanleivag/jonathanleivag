import { gql } from 'graphql-tag'

export const contactGql = gql`
  mutation Contact($input: ContactInput) {
    contact(input: $input)
  }
`
