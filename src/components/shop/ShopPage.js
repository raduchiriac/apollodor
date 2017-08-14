import assert from 'assert';
import React from 'react'

import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { filter } from 'graphql-anywhere'

import { Loading } from '../../shared'
import { ShopCard, ShopCardHeader } from '../shop'

const PokemonQuery = gql`
  query PokemonQuery($id: ID!) {
    Pokemon(id: $id) {
      ...ShopCardHeaderFragment
      ...ShopCardFragment
    }
  }
  ${ ShopCardHeader.fragments.shop }
  ${ ShopCard.fragments.shop }
`

class ShopPageComponent extends React.Component {
  constructor () {
    super()
    this._goBack = this._goBack.bind(this)
  }

  render () {    
    const { loading, error, Pokemon } = this.props.data;
    
    assert.strictEqual(error, undefined);

    if (loading) {
      return (<Loading />);
    }
    
    return (
      <div>
        <ShopCardHeader shop={ filter(ShopCardHeader.fragments.shop, Pokemon) } />
        <ShopCard shop={ filter(ShopCard.fragments.shop, Pokemon) }
                     handleBack={ this._goBack } afterChange={ this._goBack } />
      </div>
    )
  }

  _goBack () {
    this.props.history.replace('/');
  }
}

ShopPageComponent.PropTypes = {
  data: PropTypes.shape({
    loading: PropTypes.boolean,
    error: PropTypes.object,
    Pokemon: PropTypes.object
  }).isRequired
}

export const ShopPage = graphql(PokemonQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.shopId
    }
  })
})(ShopPageComponent)