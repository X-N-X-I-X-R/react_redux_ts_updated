import { Component } from 'react';
import { connect } from 'react-redux'

export class Homepage extends Component {
  render() {
    // Get the nickname from session storage
    const user_nickname = sessionStorage.getItem('user_nickname');

    return (
      <div>Hey {user_nickname}</div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)