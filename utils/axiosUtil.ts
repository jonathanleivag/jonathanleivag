import axios from 'axios'
import { DocumentNode, print } from 'graphql'
import { NEXT_PUBLIC_URL_API } from '.'

export interface IAxiosGraphqlUtils {
  query: DocumentNode
  variables?: object
  url?: string
}

export const axiosGraphqlUtils = async ({
  query,
  variables,
  url = `${NEXT_PUBLIC_URL_API}/graphql`
}: IAxiosGraphqlUtils) => {
  const { data } = await axios.post(
    url,
    {
      query: print(query),
      variables
    },
    {
      withCredentials: true
    }
  )

  return data
}
