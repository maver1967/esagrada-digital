import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

const hasCert = fs.existsSync('./cert.key') && fs.existsSync('./cert.crt');
const httpsConfig = hasCert ? {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.crt'),
} : undefined;

let syncData = { acessos: [], avisos: [], ts: 0 };

const syncPlugin = () => ({
  name: 'sync-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/sync') {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const incoming = JSON.parse(body);
              if (incoming.acessos || incoming.avisos) {
                const existingAccessIds = new Set((syncData.acessos || []).map(x => x.id));
                const newAccesses = (incoming.acessos || []).filter(x => !existingAccessIds.has(x.id));
                syncData.acessos = [...newAccesses, ...(syncData.acessos || [])];

                const existingNoticeIds = new Set((syncData.avisos || []).map(x => x.id));
                const newNotices = (incoming.avisos || []).filter(x => !existingNoticeIds.has(x.id));
                syncData.avisos = [...newNotices, ...(syncData.avisos || [])];

                syncData.ts = Date.now();
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, ts: syncData.ts }));
            } catch (e) {
              res.statusCode = 400;
              res.end('Invalid JSON');
            }
          });
          return;
        } else if (req.method === 'GET') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(syncData));
          return;
        }
      }
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/sync') {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const incoming = JSON.parse(body);
              if (incoming.acessos || incoming.avisos) {
                const existingAccessIds = new Set((syncData.acessos || []).map(x => x.id));
                const newAccesses = (incoming.acessos || []).filter(x => !existingAccessIds.has(x.id));
                syncData.acessos = [...newAccesses, ...(syncData.acessos || [])];

                const existingNoticeIds = new Set((syncData.avisos || []).map(x => x.id));
                const newNotices = (incoming.avisos || []).filter(x => !existingNoticeIds.has(x.id));
                syncData.avisos = [...newNotices, ...(syncData.avisos || [])];

                syncData.ts = Date.now();
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, ts: syncData.ts }));
            } catch (e) {
              res.statusCode = 400;
              res.end('Invalid JSON');
            }
          });
          return;
        } else if (req.method === 'GET') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(syncData));
          return;
        }
      }
      next();
    });
  }
});

export default defineConfig({
  base: './',
  server: {
    https: httpsConfig,
    allowedHosts: true
  },
  preview: {
    https: false,
    allowedHosts: true
  },
  plugins: [
    syncPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Esagrada Plataforma Digital',
        short_name: 'Esagrada',
        description: 'Gestor de horários da Escola Pré-Universitária Sagrada Família',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'assets/pwa_icon_192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'assets/pwa_icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000
      }
    })
  ]
});
