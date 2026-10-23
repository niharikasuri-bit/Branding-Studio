import { useState } from 'react';
import { Button } from '@egovernments/digit-ui-components';
import { EMPTY_ANSWERS, type Answers } from './setup/steps';
import { AccountProvider, loadSaved, useAccount } from './lib/store';
import { ErrorToastHost } from './ui/ErrorToast';
import { Branding } from './ui/Branding';
import { Icon } from './components/Icon';
import { LOGO } from './logo';

/**
 * Just the Branding page from the unified onboarding console, inside the same top bar, side nav
 * and sub-header. Only the Branding page works: the nav, Back, Help and Restart look the same
 * but do nothing. Changes are kept in the browser, so they survive a reload.
 */
const DEMO: Answers = { ...EMPTY_ANSWERS, name: 'Elena Garcia', email: 'saas@gmail.com', org: 'Demo Account', products: ['cms', 'hcm'] };

/** The account nav, as in the console. */
const ACCOUNT_NAV: { id: string; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'geographies', label: 'Geographies', icon: 'Public' },
  { id: 'sender', label: 'Notification Channels', icon: 'Email' },
  { id: 'team', label: 'Team', icon: 'Group' },
  { id: 'branding', label: 'Branding and Theming', icon: 'InvertColors' },
  { id: 'languages', label: 'Language', icon: 'Translate' },
  { id: 'integrations', label: 'Integrations', icon: 'Extension' },
  { id: 'health', label: 'Product Health', icon: 'Analytics' },
];

export default function App() {
  const [saved] = useState(() => loadSaved());
  return (
    <AccountProvider answers={saved?.answers ?? DEMO} initial={saved?.account} onRestart={() => {}}>
      <Frame />
      <ErrorToastHost />
    </AccountProvider>
  );
}

function Frame() {
  const { account } = useAccount();
  const b = account.branding;
  return (
    <div className="sh">
      <a className="sh-skip" href="#main">
        Skip to main content
      </a>
      <header className="sh-top">
        <div className="sh-org">
          {b.logo ? (
            <img src={b.logo} alt="" className="sh-org-logo" />
          ) : (
            <span className="sh-org-mark" aria-hidden="true" style={b.colour ? { background: b.colour } : undefined}>
              {(b.name[0] ?? 'D').toUpperCase()}
            </span>
          )}
          <span className="sh-org-name">{b.name}</span>
        </div>
        <div className="sh-top-end">
          <img className="sh-digit" src={LOGO} alt="DIGIT" width={528} height={124} />
        </div>
      </header>

      <div className="sh-body">
        {/* Icons only, as on every page but Home */}
        <nav className="sh-nav is-mini" aria-label="Account">
          <div className="sh-search">
            <input type="search" placeholder="Search" aria-label="Search the menu" />
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
              <path d="M15 15l5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <ul>
            {ACCOUNT_NAV.map((n) => (
              <li key={n.id}>
                <button type="button" className="sh-nav-item" data-label={n.label} aria-current={n.id === 'branding' ? 'page' : undefined}>
                  <Icon name={n.icon} size={20} />
                  <span className="sh-nav-label">{n.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="sh-nav-foot">
            <button type="button" className="sh-restart" data-label="Restart">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sh-nav-label">Restart</span>
            </button>
            <p className="sh-powered">
              Powered by <img src={LOGO} alt="DIGIT" width={528} height={124} />
            </p>
          </div>
        </nav>
        <div className="sh-content">
          <div className="sh-sub has-back">
            <button type="button" className="sh-back-home">
              <Icon name="ArrowBack" size={18} />
              Back
            </button>
            <h1 className="sh-sub-title">Branding and Theming</h1>
            <span className="ux-help-btn">
              <Button variation="secondary" size="medium" icon="HelpOutline" label="Help" onClick={() => {}} />
            </span>
          </div>
          <main id="main" className="sh-main" tabIndex={-1}>
            <Branding />
          </main>
        </div>
      </div>
    </div>
  );
}
