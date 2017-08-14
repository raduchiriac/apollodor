import React from 'react'
import PropTypes from 'prop-types'

import { gql, graphql, compose } from 'react-apollo'
import { propType } from 'graphql-anywhere'

import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : props.delete ? '#ba2626' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

const ImageContainer = styled.div`
  width: 100%;
  background-color: #F7F7F7;
  min-height: 250px;
  margin-bottom: 20px;
`

class ShopCardComponent extends React.Component {

  static fragments = {
    shop: gql`
      fragment ShopCardFragment on Pokemon {
        id
        name
        url
      }
    `
  }

  constructor (props) {
    super(props)

    const { name, url } = props.shop;

    this.state = { name, url }
    this._handleUpdate = this._handleUpdate.bind(this)
    this._handleDelete = this._handleDelete.bind(this)
  }

  render () {
    return (
      <div className="w-100 pa4 flex justify-center">
        <Card style={{ maxWidth: 400 }}>
          <input
            className="w-100 pa3 mv2"
            value={ this.state.name }
            placeholder="Name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            className="w-100 pa3 mv2"
            value={ this.state.url }
            placeholder="Image Url"
            onChange={ (e) => this.setState({ url: e.target.value }) }
          />
          <ImageContainer>
            { this.state.url &&
              <img src={ this.state.url } alt={ this.state.name } className="w-100 mv3 pa4" />
            }
          </ImageContainer>
          <div className='flex justify-between'>
            <Button delete onClick={ this._handleDelete }>Delete</Button>
            <Button onClick={ this.props.handleBack }>Back</Button>
            { this._canUpdate
              ? <Button save onClick={ this._handleUpdate }>Update</Button>
              : <Button disabled>Update</Button>
            }
          </div>
        </Card>
      </div>
    )
  }

  get _canUpdate () {
    return this.state.name && this.state.url &&
      (this.props.shop.name !== this.state.name || this.props.shop.url !== this.state.url)
  }

  _handleUpdate () {
    const { id } = this.props.shop
    const { name, url } = this.state
    this.props.updatePokemon({ variables: { id, name, url } })
    .then(this.props.afterChange)
  }

  _handleDelete () {
    const { id } = this.props.shop
    this.props.deletePokemon({ variables: { id } })
    .then(this.props.afterChange)
  }
}

ShopCardComponent.PropTypes = {
  shop: propType(ShopCardComponent.fragments.shop).isRequired,
  handleBack: PropTypes.func.isRequired,
  afterChange: PropTypes.func.isRequired,
  updatePokemon: PropTypes.func.isRequired,
  deletePokemon: PropTypes.func.isRequired
}

const updatePokemon = gql`
  mutation updatePokemon($id: ID!, $name: String, $url: String) {
    updatePokemon(id: $id, name: $name, url: $url) {
      ...ShopCardFragment
    }
  }
  ${ ShopCardComponent.fragments.shop }
`

const deletePokemon = gql`
  mutation deletePokemon($id: ID!) {
    deletePokemon(id: $id) {
      id
    }
  }
`

export const ShopCard = compose(
  graphql(updatePokemon, {
    name: 'updatePokemon'
  }),
  graphql(deletePokemon, {
    name: 'deletePokemon'
  })
)(ShopCardComponent)
