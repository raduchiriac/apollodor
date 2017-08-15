import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import Connect from './connect';
import Store from './store';

import { Shop, ShopPage, AddShopCard } from './components/shop'
import { MapView } from './components/maps'

import 'tachyons'
import './index.css'

const client = Connect();

const store = Store(client);

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
