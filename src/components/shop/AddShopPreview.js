import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export class AddShopPreview extends React.Component {
  render () {
    return (
      <Link
        to={`/shop/create/${this.props.trainerId}`}
        style={{ minWidth: 200 }}
        className='link dim mw4 ma2 ba b--dashed bw3 b--silver flex justify-center items-center'
      >
        <div className='silver tc v-mid fw4 f1'>+</div>
      </Link>
    )
  }
}

AddShopPreview.PropTypes = {
  trainerId: PropTypes.string.isRequired,
}