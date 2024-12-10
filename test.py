import requests

def run_query(query):
    headers = {"Content-Type": "application/json"}
    response = requests.post('https://api.tarkov.dev/graphql', headers=headers, json={'query': query})
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(response.status_code, query))


new_query = """
{
  tasks {
    name
    objectives {
      description
      maps {
        name
      }
      optional
    }
    restartable
    startRewards {
      items {
        quantity
        count
        item {
          name
          imageLink
        }
      }
      offerUnlock {
        item {
          name
          imageLink
        }
      }
      skillLevelReward {
        name
        skill {
          name
        }
        level
      }
    }
    finishRewards {
      items {
        item {
          name
          imageLink
        }
        quantity
        count
      }
    }
    failConditions {
      description
    }
    factionName
    experience
    availableDelaySecondsMin
  }
}
"""

result = run_query(new_query)
print(result)