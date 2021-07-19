import { Component } from 'react'

import SignIn from '../../components/Auth/SignIn'
import SignUp from '../../components/Auth/SignUp'

const forms = {
  signIn: {
    username: { type: 'text', label: 'Enter the User Name' },
    password: { type: 'password', label: 'Enter the Password' }
  },
  signUp: {
    name: { type: 'text', label: 'Enter Name' },
    username: { type: 'text', label: 'Enter the User Name' },
    password: { type: 'password', label: 'Enter the Password' }
  }
}

export class AuthPage extends Component {

  state = {
    page: 'signIn' // signIn | signUp
  }

  render() {
    return (
      <div className="auth-page">
        {
          this.state.page === 'signIn' ? (
            <SignIn form={forms.signIn} />
          ) : (
            <SignUp form={forms.signUp} />
          )
        }
      </div>
    )
  }
}

export default AuthPage