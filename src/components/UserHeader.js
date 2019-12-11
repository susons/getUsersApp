import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUser } from '../actions'

class UserHeader extends Component {
  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <div className="header">
        {user.name}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps;
  const user = state.users.find(user => user.id === userId)
  return { user: user}
}

export default connect(mapStateToProps, { fetchUser })(UserHeader);
