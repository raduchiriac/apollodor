import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const ImageContainer = styled.div`
  width: 100%;
  background-color: #F7F7F7;
  min-height: 250px;
  margin-bottom: 20px;
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

class AddShopCardComponent extends React.Component {

  constructor () {
    super();

    this.state = {
      name: '',
      url: ''
    };
    this._handleSave = this._handleSave.bind(this);
    this._handleBack = this._handleBack.bind(this);
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <Card style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.url}
            placeholder='Image Url'
            onChange={(e) => this.setState({url: e.target.value})}
          />
          <ImageContainer>
            {this.state.url &&
              <img src={this.state.url} alt='presentation' className='w-100 mv3' />
            }
          </ImageContainer>
          <div className='flex justify-between'>
            <Button onClick={this._handleBack}>Cancel</Button>
            {this._canSave()
              ? <Button save onClick={this._handleSave}>Save</Button>
              : <Button disabled>Save</Button>
            }
          </div>
        </Card>
      </div>
    )
  }

  _canSave = () => {
    return this.state.name && this.state.url
  }

  _handleSave = () => {
    const {name, url} = this.state
    const trainerId = this.props.match.params.trainerId
    this.props.mutate({variables: {name, url, trainerId}})
      .then(() => {
        this._handleBack();
      })
  }

  _handleBack = () => {
    this.props.history.replace('/')
  }
}

AddShopCardComponent.PropTypes = {
  router: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
}

const createShopMutation = gql`
  mutation createPokemon($name: String!, $url: String!, $trainerId: ID) {
    createPokemon(name: $name, url: $url, trainerId: $trainerId) {
      trainer {
        id
        ownedPokemons {
          id
        }
      }
    }
  }
`

export const AddShopCard = graphql(createShopMutation)(AddShopCardComponent)
