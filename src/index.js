import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { Shop, ShopPage, AddShopCard } from './components/shop'
import { MapView } from './components/maps'

import 'tachyons'
import './index.css'

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

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

ReactDOM.render((
    <ApolloProvider store={store} client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/shop' component={Shop} />
            <Route path='/shop/view/:shopId' component={ShopPage} />
            <Route path='/shop/create/:trainerId' component={AddShopCard} />
          <Route path='/maps' component={MapView} />
          <Redirect from="*" to="/shop" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  ),
  document.getElementById('root')
)
