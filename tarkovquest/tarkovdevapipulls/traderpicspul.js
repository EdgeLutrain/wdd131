import { request, gql } from 'graphql-request'

const query = gql`
query MyQuery {
  traders {
    name
    imageLink
  }
}
`

request('https://api.tarkov.dev/graphql', query).then((data) => console.log(data))