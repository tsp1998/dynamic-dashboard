import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './Header.css'

const Header = ({ currentUser, children }) => (
  <div className="header">
    <Link className="brand" to="/">
      <span>Dynamic Dashboard</span>
    </Link>

    <div className="controls">
      {children}
    </div>
  </div>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default withRouter(connect(mapStateToProps)(Header))