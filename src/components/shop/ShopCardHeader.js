import React from 'react'
import { gql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
  max-width: 400px;
  margin-top: 50px;
`

export class ShopCardHeader extends React.Component {

  static fragments = {
    shop: gql`
      fragment ShopCardHeaderFragment on Pokemon {
        name
        trainer {
          name
        }
      }
    `
  }
 
  render () {
    const { name, trainer } = this.props.shop
    return (
      <div className='w-100 flex justify-center'>
        <Title>{ name } owned by { trainer.name }</Title>
      </div>
    )
  }
}

ShopCardHeader.PropTypes = {
  shop: propType(ShopCardHeader.fragments.shop).isRequired
}