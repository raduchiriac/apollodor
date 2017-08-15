import assert from 'assert'

import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import styled from 'styled-components'

import { Loading } from '../../shared'
import { ShopPreview, AddShopPreview } from '../shop'

const Title = styled.div`
  color: #7F0F7F;
  font-size: 32px;
  font-weight: 300;
`;

const TrainerQuery = gql`query TrainerQuery($name: String!) {
    Trainer(name: $name) {
      id
      name
      ownedPokemons {
        id
        name
        url
      }
      _ownedPokemonsMeta {
        count
      }
    }
  }`


class ShopComponent extends React.Component {

  componentWillReceiveProps({ router, data: { Trainer } }) {
    if (!Trainer) {
      return
    }
  }

  render () {
    const { loading, error, Trainer } = this.props.data;

    assert.strictEqual(error, undefined);

    if (loading) {
      return (<Loading />);
    }

    const shops = Trainer.ownedPokemons
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Welcome
        </Title>
        <div className='flex flex-wrap justify-center center w-75'>
          <AddShopPreview trainerId={ Trainer.id } />
          {
            shops.map(shop => <ShopPreview key={shop.id} shop={shop} />)
          }
        </div>
      </div>
    )
  }
}

ShopComponent.PropTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    Trainer: PropTypes.object,
  }).isRequired,
  router: PropTypes.object.isRequired,
}

// export with the data
export const Shop = graphql(TrainerQuery, {
    options: (ownProps) => ({
      // pollInterval: 2000,
      variables: {
        name: 'Radu Chiriac',
      },
      fetchPolicy: 'network-only',
    })
})(ShopComponent)
