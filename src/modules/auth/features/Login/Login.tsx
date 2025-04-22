import CardBalance from '../../../shared/components/Cards/Card-BALANCE/Card-balance'
import { useLocation } from 'react-router-dom'
import { Console } from 'console'
import { PATH } from '../../routes/paths'
import { supabase } from '@src/modules/shared/utils/supabase'
import { FaGithub } from 'react-icons/fa'
const Login = () => {
  const location = window.location.origin
  console.log(location)

  async function signInWithGithub() {
    console.log('Sign in with GitHub clicked')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location}${PATH.LOGIN}`,
      },
    })
    await supabase.auth.getSession()

    if (error) {
      console.error('Erreur de connexion GitHub :', error.message)
    }
  }

  return (
    <div className="login-module">
      <CardBalance>
        <>
          <p className="card-balance-title">Welcome</p>
          <p className="card-balance-description">
            Login via your Github account to get started with our app
          </p>
          <button className="card-balance-loginbtn" onClick={signInWithGithub}>
            <FaGithub className="card-balance-loginbtn-icon" />
            <span className="card-balance-loginbtn-text">Sign in with GitHub</span>
          </button>
        </>
      </CardBalance>
    </div>
  )
}

export default Login
