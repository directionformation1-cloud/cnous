import { useEffect, useMemo, useState } from 'react'
import logo from './assets/logo.webp'
import { subscribeToDemoSubmissions, updateDemoSubmissionStatus } from './demoSubmissions'
import './Admin.css'

const ADMIN_USERNAME = 'cnous'
const ADMIN_PASSWORD = 'Chapixpert2025*'
const SESSION_KEY = 'caisse-epargne-admin-session'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    folder: <path d="M3 5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.37.38.7.68.96.3.26.68.4 1.08.4H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    arrowUp: <path d="m18 15-6-6-6 6"/>,
    userPlus: <><path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    eyeOff: <><path d="m3 3 18 18"/><path d="M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-2.1 2.8M6.4 6.4A15.5 15.5 0 0 0 2 12s3.5 6 10 6a10.8 10.8 0 0 0 4-.8"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

const initialRequests = [
  { id: 'DOS-2481', name: 'Sophie Martin', email: 's.martin@example.fr', offer: 'Compte individuel', date: 'Aujourd’hui, 09:42', status: 'À traiter', initials: 'SM', color: 'coral' },
  { id: 'DOS-2480', name: 'Thomas Bernard', email: 't.bernard@example.fr', offer: 'Compte joint', date: 'Aujourd’hui, 08:16', status: 'En cours', initials: 'TB', color: 'blue' },
  { id: 'DOS-2479', name: 'Léa Dubois', email: 'lea.dubois@example.fr', offer: 'Compte individuel', date: 'Hier, 17:35', status: 'Validé', initials: 'LD', color: 'green' },
  { id: 'DOS-2478', name: 'Hugo Robert', email: 'h.robert@example.fr', offer: 'Compte jeune', date: 'Hier, 14:08', status: 'En cours', initials: 'HR', color: 'violet' },
  { id: 'DOS-2477', name: 'Emma Leroy', email: 'emma.leroy@example.fr', offer: 'Compte individuel', date: '06 oct., 16:22', status: 'Validé', initials: 'EL', color: 'gold' },
]

const navItems = [
  ['overview', 'Vue d’ensemble'],
  ['folder', 'Demandes'],
  ['users', 'Clients'],
  ['calendar', 'Rendez-vous'],
]

function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'authenticated')
      onSuccess()
      return
    }
    setError('Identifiant ou mot de passe incorrect.')
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-aside">
        <a className="admin-brand admin-brand-light" href="/" aria-label="Retour au site">
          <img src={logo} alt="Caissse d'epargne" />
        </a>
        <div className="login-aside-copy">
          <span className="login-secure-pill"><Icon name="lock" size={15}/> Accès sécurisé</span>
          <h1>Pilotez votre activité en toute simplicité.</h1>
          <p>Suivez les demandes, accompagnez vos clients et gardez une vue claire sur l’activité de votre espace.</p>
        </div>
        <p className="login-aside-foot">Espace réservé aux administrateurs autorisés.</p>
      </section>

      <section className="admin-login-main">
        <div className="admin-login-card">
          <div className="login-mobile-logo"><img src={logo} alt="Caissse d'epargne" /></div>
          <span className="admin-login-icon"><Icon name="lock" size={24}/></span>
          <p className="admin-kicker">ESPACE ADMINISTRATION</p>
          <h2>Ravi de vous revoir</h2>
          <p className="admin-login-copy">Connectez-vous pour accéder à votre tableau de bord.</p>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-username">Nom d’utilisateur</label>
            <div className="admin-input-wrap">
              <Icon name="users" size={19}/>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(event) => { setUsername(event.target.value); setError('') }}
                autoComplete="username"
                placeholder="Votre identifiant"
                required
                autoFocus
              />
            </div>

            <div className="admin-password-label">
              <label htmlFor="admin-password">Mot de passe</label>
            </div>
            <div className="admin-input-wrap">
              <Icon name="lock" size={18}/>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => { setPassword(event.target.value); setError('') }}
                autoComplete="current-password"
                placeholder="Votre mot de passe"
                required
              />
              <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={19}/>
              </button>
            </div>

            {error && <p className="admin-login-error" role="alert">{error}</p>}
            <button className="admin-login-submit" type="submit">Se connecter <Icon name="chevron" size={18}/></button>
          </form>
          <p className="admin-login-help">Un problème de connexion ? <a href="mailto:bonjour@example.test">Contacter le support</a></p>
        </div>
      </section>
    </main>
  )
}

function Dashboard({ onLogout }) {
  const [navOpen, setNavOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Toutes')
  const [requests, setRequests] = useState(initialRequests)
  const [demoRequests, setDemoRequests] = useState([])
  const [dataError, setDataError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => subscribeToDemoSubmissions((submissions) => {
    const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })

    setDemoRequests(submissions.map((submission) => {
      const createdAt = submission.createdAt?.toDate?.()
      const initials = submission.identifier.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase() || 'ID'

      return {
        id: `UNI-${submission.firestoreId.slice(-6).toUpperCase()}`,
        name: submission.identifier,
        email: 'Dossier universitaire',
        accountNumber: submission.accountNumber,
        offer: 'Vérification publique',
        date: createdAt ? dateFormatter.format(createdAt) : 'À l’instant',
        status: submission.status || 'À traiter',
        initials,
        color: 'coral',
        firestoreId: submission.firestoreId,
      }
    }))
    setDataError('')
  }, (error) => {
    console.error('Unable to load demo submissions:', error)
    setDataError('Impossible de charger les dossiers universitaires. Vérifiez les règles Firestore.')
  }), [])

  const allRequests = useMemo(() => [...demoRequests, ...requests], [demoRequests, requests])

  const filteredRequests = useMemo(() => allRequests.filter((request) => {
    const query = search.trim().toLowerCase()
    const matchesQuery = !query || `${request.name} ${request.email} ${request.accountNumber || ''} ${request.id} ${request.offer}`.toLowerCase().includes(query)
    return matchesQuery && (statusFilter === 'Toutes' || request.status === statusFilter)
  }), [allRequests, search, statusFilter])

  const updateStatus = async (id, status) => {
    const demoRequest = demoRequests.find((request) => request.id === id)
    if (demoRequest) {
      try {
        await updateDemoSubmissionStatus(demoRequest.firestoreId, status)
        setNotice(`Le statut de ${id} a été mis à jour.`)
      } catch (error) {
        console.error('Unable to update demo submission:', error)
        setNotice(`La mise à jour de ${id} a échoué.`)
      }
      window.setTimeout(() => setNotice(''), 2400)
      return
    }

    setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request))
    setNotice(`Le statut de ${id} a été mis à jour.`)
    window.setTimeout(() => setNotice(''), 2400)
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    onLogout()
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${navOpen ? 'open' : ''}`}>
        <div className="sidebar-head">
          <a className="admin-brand" href="/" aria-label="Retour au site"><img src={logo} alt="Caissse d'epargne" /></a>
          <button className="sidebar-close" type="button" onClick={() => setNavOpen(false)} aria-label="Fermer le menu"><Icon name="close"/></button>
        </div>
        <nav className="admin-nav" aria-label="Navigation administration">
          <p>MENU PRINCIPAL</p>
          {navItems.map(([icon, label], index) => (
            <button className={index === 0 ? 'active' : ''} type="button" key={label} onClick={() => setNavOpen(false)}>
              <Icon name={icon}/><span>{label}</span>{label === 'Demandes' && <b>8</b>}
            </button>
          ))}
          <p className="nav-section-title">GESTION</p>
          <button type="button"><Icon name="settings"/><span>Paramètres</span></button>
        </nav>
        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer"><Icon name="external" size={18}/> Voir le site public</a>
          <button type="button" onClick={logout}><Icon name="logout" size={18}/> Se déconnecter</button>
        </div>
      </aside>

      {navOpen && <button className="sidebar-scrim" type="button" aria-label="Fermer le menu" onClick={() => setNavOpen(false)} />}

      <div className="admin-workspace">
        <header className="admin-topbar">
          <button className="admin-menu-button" type="button" onClick={() => setNavOpen(true)} aria-label="Ouvrir le menu"><Icon name="menu"/></button>
          <div className="topbar-search">
            <Icon name="search" size={19}/>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un client, une demande…" aria-label="Rechercher" />
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <button className="notification-button" type="button" aria-label="Notifications"><Icon name="bell"/><span /></button>
            <div className="topbar-profile"><span>CN</span><div><strong>cnous</strong><small>Administrateur</small></div></div>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-heading-row">
            <div><p className="admin-date">MERCREDI 7 OCTOBRE 2026</p><h1>Bonjour, cnous</h1><p>Voici ce qui se passe aujourd’hui.</p></div>
            <button className="new-request-button" type="button" onClick={() => setNotice('Utilisez le formulaire public de démonstration pour créer une demande.')}><Icon name="userPlus"/> Nouvelle demande</button>
          </div>

          {notice && <div className="admin-toast" role="status"><Icon name="check" size={17}/>{notice}</div>}
          {dataError && <div className="admin-data-error" role="alert">{dataError}</div>}

          <section className="metric-grid" aria-label="Indicateurs clés">
            <article className="metric-card"><div className="metric-top"><span className="metric-icon red"><Icon name="folder"/></span><span className="metric-trend"><Icon name="arrowUp" size={14}/> 12,5 %</span></div><p>Demandes ce mois</p><strong>248</strong><small>contre 220 le mois dernier</small></article>
            <article className="metric-card"><div className="metric-top"><span className="metric-icon blue"><Icon name="clock"/></span><span className="metric-trend"><Icon name="arrowUp" size={14}/> 8,2 %</span></div><p>Dossiers en cours</p><strong>36</strong><small>8 nécessitent votre attention</small></article>
            <article className="metric-card"><div className="metric-top"><span className="metric-icon green"><Icon name="check"/></span><span className="metric-trend"><Icon name="arrowUp" size={14}/> 4,7 %</span></div><p>Taux de validation</p><strong>84,6 %</strong><small>+3,8 pts sur les 30 derniers jours</small></article>
            <article className="metric-card"><div className="metric-top"><span className="metric-icon violet"><Icon name="calendar"/></span><span className="metric-neutral">Cette semaine</span></div><p>Rendez-vous</p><strong>18</strong><small>5 rendez-vous aujourd’hui</small></article>
          </section>

          <section className="admin-panels">
            <article className="activity-panel">
              <div className="panel-heading"><div><h2>Activité des demandes</h2><p>Évolution sur les 7 derniers jours</p></div><select aria-label="Période"><option>7 derniers jours</option><option>30 derniers jours</option></select></div>
              <div className="chart-wrap" aria-label="Graphique des demandes sur sept jours">
                <div className="chart-scale"><span>60</span><span>40</span><span>20</span><span>0</span></div>
                <div className="bar-chart">
                  {[['Jeu.', 52, 31], ['Ven.', 65, 37], ['Sam.', 38, 20], ['Dim.', 26, 14], ['Lun.', 76, 45], ['Mar.', 88, 51], ['Mer.', 70, 39]].map(([day, received, approved]) => (
                    <div className="bar-group" key={day}><div className="bars"><span style={{ height: `${received}%` }} /><span style={{ height: `${approved}%` }} /></div><small>{day}</small></div>
                  ))}
                </div>
              </div>
              <div className="chart-legend"><span><i className="legend-red"/>Demandes reçues</span><span><i className="legend-pink"/>Dossiers validés</span></div>
            </article>

            <article className="appointments-panel">
              <div className="panel-heading"><div><h2>Rendez-vous du jour</h2><p>5 rendez-vous planifiés</p></div><button type="button" aria-label="Plus d’options"><Icon name="more"/></button></div>
              <div className="appointment-list">
                <div><time>09:30</time><span className="appointment-line red"/><p><strong>Camille Petit</strong><small>Ouverture de compte · Agence</small></p></div>
                <div><time>11:00</time><span className="appointment-line blue"/><p><strong>Lucas Moreau</strong><small>Conseil épargne · Visio</small></p></div>
                <div><time>14:15</time><span className="appointment-line green"/><p><strong>Manon Simon</strong><small>Finalisation dossier · Agence</small></p></div>
                <div><time>16:30</time><span className="appointment-line violet"/><p><strong>Arthur Michel</strong><small>Premier échange · Téléphone</small></p></div>
              </div>
              <button className="all-appointments" type="button">Voir tous les rendez-vous <Icon name="chevron" size={16}/></button>
            </article>
          </section>

          <section className="requests-panel">
            <div className="requests-heading"><div><h2>Demandes récentes</h2><p>Les dernières demandes d’ouverture de compte.</p></div><button type="button">Voir toutes les demandes <Icon name="chevron" size={16}/></button></div>
            <div className="table-toolbar">
              <div className="table-search"><Icon name="search" size={17}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher…" aria-label="Rechercher dans les demandes" /></div>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filtrer par statut"><option>Toutes</option><option>À traiter</option><option>En cours</option><option>Validé</option></select>
            </div>
            <div className="requests-table-wrap">
              <table className="requests-table">
                <thead><tr><th>UTILISATEUR</th><th>NUMÉRO DE COMPTE</th><th>DEMANDE</th><th>OFFRE</th><th>DATE</th><th>STATUT</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td><div className="client-cell"><span className={`client-avatar ${request.color}`}>{request.initials}</span><p><strong>{request.name}</strong><small>{request.email}</small></p></div></td>
                      <td><span className={`account-number ${request.accountNumber ? '' : 'unavailable'}`}>{request.accountNumber || '—'}</span></td>
                      <td><strong className="request-id">{request.id}</strong></td>
                      <td>{request.offer}</td>
                      <td>{request.date}</td>
                      <td><select className={`status-select status-${request.status.toLowerCase().replace('à ', 'a-').replace(' ', '-')}`} value={request.status} onChange={(event) => updateStatus(request.id, event.target.value)} aria-label={`Statut de ${request.id}`}><option>À traiter</option><option>En cours</option><option>Validé</option></select></td>
                      <td><button className="row-action" type="button" aria-label={`Actions pour ${request.name}`}><Icon name="more"/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filteredRequests.length && <div className="empty-results"><Icon name="search"/><strong>Aucun résultat</strong><p>Essayez de modifier votre recherche ou votre filtre.</p></div>}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function Admin() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'authenticated')
  return authenticated ? <Dashboard onLogout={() => setAuthenticated(false)} /> : <Login onSuccess={() => setAuthenticated(true)} />
}

export default Admin
