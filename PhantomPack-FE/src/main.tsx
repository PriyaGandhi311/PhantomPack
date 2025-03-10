import { Auth0Provider } from '@auth0/auth0-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const domain: string = "dev-m0r-mza3.us.auth0.com"
const clientId: string = "xly4Gl4lG2NqqJkPgBAbiErIahAMIasY"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider 
      domain={domain} 
      clientId={clientId} 
      authorizationParams={{ 
        redirect_uri: window.location.origin, 
        scope: 'openid profile email', 
      }}
    >
    <App />
    </Auth0Provider>
  </StrictMode>,
)
