import { request, gql } from 'graphql-request'

const query = gql`
query MyQuery {
  tasks {
    factionName
    kappaRequired
    lightkeeperRequired
    name
    restartable
    objectives {
      description
      optional
      maps {
        name
      }
    }
    wikiLink
    experience
    finishRewards {
      items {
        item {
          name
        }
        quantity
      }
      offerUnlock {
        item {
          name
        }
      }
    }
    startRewards {
      items {
        item {
          name
        }
        quantity
      }
    }
    taskRequirements {
      task {
        name
      }
    }
    taskImageLink
    failConditions {
      description
    }
  }
}
`

request('https://api.tarkov.dev/graphql', query).then((data) => console.log(data))