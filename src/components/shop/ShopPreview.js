import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export class ShopPreview extends React.Component {
  render () {
    return (
      <Link
        to={`/shop/view/${this.props.shop.id}`}
        style={{ minWidth: 200 }}
        className='link dim grow mw4 bg-white ma2 pa3 shadow-1'
      >
        <img src={this.props.shop.url} alt={this.props.shop.name} />
        <div className='gray tc'>{this.props.shop.name}</div>
      </Link>
    )
  }
}

ShopPreview.propTypes = {
  Shop: PropTypes.object
}
