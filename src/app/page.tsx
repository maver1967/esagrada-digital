'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Theme initializer
    const theme = localStorage.getItem('esagrada_theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Ensure #app is displayed once scripts load
    const timer = setTimeout(() => {
      const appEl = document.getElementById('app');
      if (appEl) {
        appEl.style.display = 'flex';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="app" id="app" style={{ display: 'none' }}>
        <aside className="side">
          <div className="brand">
            <div className="mark" id="brandMark"></div>
            <div>
              <div className="bt">ESAGRADA</div>
              <div className="bs">Plataforma digital</div>
            </div>
          </div>
          <nav className="nav" id="nav"></nav>
          <div className="foot">
            Escola Pré-Universitária<br />
            Sagrada Família · Maxixe<br />
            <span
              style={{ opacity: 0.8, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => (window as any).forceAppUpdate && (window as any).forceAppUpdate()}
              title="Clique para forçar atualização"
            >
              v4.2.3 · 10/08/2026 · 🔄 atualizar
            </span>
          </div>
        </aside>

        <header className="topbar">
          <button
            className="navtoggle"
            id="navToggle"
            aria-label="Abrir menu"
            onClick={() => (window as any).toggleSidebar && (window as any).toggleSidebar()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <div className="ttl" id="topTitle">
            Painel<small id="topSub">Visão geral</small>
          </div>
          <div className="actions">
            <button
              className="fsbtn btn-projetor-toggle"
              id="projBtn"
              aria-label="Modo Projetor"
              title="Modo Projetor (Ecrã Inteiro · Sem Scroll)"
              onClick={() => (window as any).toggleProjectorMode && (window as any).toggleProjectorMode()}
            >
              <span style={{ fontSize: '16px' }}>📺</span>
            </button>
            <button
              className="fsbtn"
              id="fsBtn"
              aria-label="Ecrã inteiro"
              title="Ecrã inteiro"
              onClick={() => (window as any).toggleFullscreen && (window as any).toggleFullscreen()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                <path d="M16 21h3a2 2 0 0 1 2-2v-3" />
              </svg>
            </button>
            <button
              className="fsbtn"
              id="themeBtn"
              aria-label="Mudar Tema"
              title="Mudar Tema"
              onClick={() => (window as any).toggleTheme && (window as any).toggleTheme()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
            <span className="savechip" id="saveChip">
              <span className="dot"></span>Guardado
            </span>
            <span
              className="versionpill"
              id="versionPill"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#38bdf8',
                background: 'rgba(56, 189, 248, 0.15)',
                padding: '4px 10px',
                borderRadius: '99px',
                border: '1px solid rgba(56, 189, 248, 0.35)',
              }}
              title="Versão Oficial ESAGRADA"
            >
              v4.2.3
            </span>
            <span className="yearpill" id="yearPill">
              2026
            </span>
          </div>
        </header>

        <div id="previewBanner" style={{ display: 'none' }}>
          <span style={{ flexShrink: 0, fontSize: '15px' }}>👁</span>
          <span id="previewText" style={{ flex: 1 }}></span>
          <button
            onClick={() => (window as any).setRole && (window as any).setRole('direcao')}
            style={{
              flexShrink: 0,
              background: '#7a5b12',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Voltar à Direção
          </button>
        </div>

        <div
          className="side-backdrop"
          id="sideBackdrop"
          onClick={() => (window as any).closeSidebar && (window as any).closeSidebar()}
        ></div>

        <main className="main">
          <div id="root" className="view"></div>
        </main>
      </div>

      <div className="projetor-exit-bar" id="projetorExitBar">
        <span>📺 Modo Projetor Activo</span>
        <button
          type="button"
          className="projetor-exit-btn"
          onClick={() => (window as any).toggleProjectorMode && (window as any).toggleProjectorMode(false)}
        >
          Sair (ESC)
        </button>
      </div>

      <div className="mask" id="mask">
        <div className="modal" id="modal"></div>
      </div>

      <div className="toast" id="toast"></div>

      <div className="pwa-banner" id="pwaBanner">
        <img className="ico" id="pwaIco" alt="" />
        <div className="txt">
          <b>Instalar a app ESAGRADA</b>
          <span>Adicione o ícone ao ecrã inicial do telemóvel</span>
        </div>
        <button className="pwa-go" onClick={() => (window as any).pwaInstall && (window as any).pwaInstall()}>
          Instalar
        </button>
        <button
          className="pwa-x"
          onClick={() => (window as any).pwaDismiss && (window as any).pwaDismiss()}
          aria-label="Fechar"
        >
          &times;
        </button>
      </div>

      <div id="exportStage" style={{ position: 'fixed', left: '-99999px', top: 0 }}></div>
    </>
  );
}
