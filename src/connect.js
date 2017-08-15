import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

export default () => {
  const GRAPH_COOL_TOKEN = process.env.REACT_APP_GRAPH_COOL_TOKEN;
  
  // Create WebSocket client
  const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/${GRAPH_COOL_TOKEN}`, {
    reconnect: true,
    connectionParams: {
      // Pass any arguments you want for initialization
    }
  });
  
  const networkInterface = createNetworkInterface({ uri: `https://api.graph.cool/simple/v1/${GRAPH_COOL_TOKEN}`})
  
  // Extend the network interface with the WebSocket
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  )
  
  const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    dataIdFromObject: o => o.id
  });

  return client;
}