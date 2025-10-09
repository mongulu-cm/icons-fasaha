const isNodeRuntime =
  typeof process !== 'undefined' &&
  !!(process.versions && process.versions.node);

let fs = null;
let path = null;
let fileURLToPathFn = null;

if (isNodeRuntime) {
  const fsModule = await import('fs');
  const pathModule = await import('path');
  const urlModule = await import('url');
  fs = fsModule.default || fsModule;
  path = pathModule.default || pathModule;
  fileURLToPathFn = urlModule.fileURLToPath;
}

const runtimeEnv =
  typeof process !== 'undefined' && process?.env ? process.env : undefined;

const visitedEnvFiles = new Set();

const loadEnvFile = (filePath) => {
  if (!filePath || visitedEnvFiles.has(filePath)) return;
  visitedEnvFiles.add(filePath);

  try {
    if (!fs || !path) return;
    const content = fs.readFileSync(filePath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      if (!line || !line.trim() || line.trim().startsWith('#')) return;

      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (!match) return;

      const [, key, rawValue] = match;
      if (runtimeEnv && runtimeEnv[key] !== undefined) return;

      let value = rawValue.trim();
      const hasDoubleQuotes = value.startsWith('"') && value.endsWith('"');
      const hasSingleQuotes = value.startsWith("'") && value.endsWith("'");

      if (hasDoubleQuotes || hasSingleQuotes) {
        value = value.slice(1, -1);
      }

      value = value.replace(/\\n/g, '\n').replace(/\\r/g, '\r');

      if (runtimeEnv) {
        runtimeEnv[key] = value;
      } else {
        if (!globalThis.__CLOUDFLARE_ENV__) {
          globalThis.__CLOUDFLARE_ENV__ = {};
        }
        globalThis.__CLOUDFLARE_ENV__[key] = value;
      }
    });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`[Cloudflare] Impossible de charger ${filePath}: ${error.message}`);
    }
  }
};

if (isNodeRuntime && fs && path && fileURLToPathFn) {
  const currentDir =
    typeof import.meta !== 'undefined' && import.meta.url
      ? path.dirname(fileURLToPathFn(import.meta.url))
      : process.cwd();

  const envFiles = [
    path.resolve(currentDir, '.env'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '.env')
  ];

  envFiles.forEach(loadEnvFile);
}

const getGlobalEnv = () => {
  if (typeof globalThis !== 'undefined' && globalThis.__CLOUDFLARE_ENV__) {
    return globalThis.__CLOUDFLARE_ENV__;
  }
  if (typeof window !== 'undefined' && window.__CLOUDFLARE_ENV__) {
    return window.__CLOUDFLARE_ENV__;
  }
  return undefined;
};

const normalize = (value) => {
  if (value === undefined || value === null) return '';
  return String(value).trim();
};

const getEnv = (key) => {
  const normalizedKey = normalize(key);
  if (!normalizedKey) return '';

  if (runtimeEnv && runtimeEnv[normalizedKey]) {
    return normalize(runtimeEnv[normalizedKey]);
  }

  if (runtimeEnv && runtimeEnv[`VITE_${normalizedKey}`]) {
    return normalize(runtimeEnv[`VITE_${normalizedKey}`]);
  }

  const globalEnv = getGlobalEnv();
  if (globalEnv && globalEnv[normalizedKey]) {
    return normalize(globalEnv[normalizedKey]);
  }
  if (globalEnv && globalEnv[`VITE_${normalizedKey}`]) {
    return normalize(globalEnv[`VITE_${normalizedKey}`]);
  }

  if (
    typeof import.meta !== 'undefined' &&
    import.meta.env
  ) {
    const fromImportMeta =
      import.meta.env[normalizedKey] ?? import.meta.env[`VITE_${normalizedKey}`];
    if (fromImportMeta !== undefined) {
      return normalize(fromImportMeta);
    }
  }

  return '';
};

const REQUIRED_KEYS = [
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_ACCESS_KEY_ID',
  'CLOUDFLARE_SECRET_ACCESS_KEY',
  'CLOUDFLARE_BUCKET_NAME',
  'CLOUDFLARE_BASE_URL'
];

const DEFAULT_AVAILABLE_ICONS = [
  'google-fonts-icon-calebasse-bw',
  'google-fonts-icon-calebasse',
  'google-fonts-icon-cloche-base-bw',
  'google-fonts-icon-cloche-double',
  'google-fonts-icon-embleme-foumban-bw',
  'google-fonts-icon-embleme-foumban',
  'google-fonts-icon-masque-elephant-bw',
  'google-fonts-icon-masque-elephant',
  'google-fonts-icon-entree-chefferie-bw',
  'google-fonts-icon-entree-chefferie',
  'google-fonts-icon-calebasse-perlee1-bw',
  'google-fonts-icon-calebasse-perlee1',
  'google-fonts-icon-calebasse-perlee2-bw',
  'google-fonts-icon-calebasse-perlee2',
  'google-fonts-icon-calebasse-perlee3-bw',
  'google-fonts-icon-calebasse-perlee3',
  'google-fonts-icon-calebasse-perlee4-bw',
  'google-fonts-icon-calebasse-perlee4',
  'google-fonts-icon-masque-batcham-bw',
  'google-fonts-icon-masque-batcham'
];

const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const authToken =
  getEnv('CLOUDFLARE_AUTH_TOKEN') ||
  getEnv('CLOUDFLARE_ACCESS_KEY_ID') ||
  '';

const requestHeaders = {
  'Content-Type': 'image/svg+xml'
};

if (authToken) {
  requestHeaders.Authorization = authToken.startsWith('Bearer ')
    ? authToken
    : `Bearer ${authToken}`;
}

export const CLOUDFLARE_CONFIG = {
  accountId: getEnv('CLOUDFLARE_ACCOUNT_ID'),
  accessKeyId: getEnv('CLOUDFLARE_ACCESS_KEY_ID'),
  secretAccessKey: getEnv('CLOUDFLARE_SECRET_ACCESS_KEY'),
  bucketName: getEnv('CLOUDFLARE_BUCKET_NAME') || 'icons-fasaha',
  baseUrl: getEnv('CLOUDFLARE_BASE_URL'),
  availableIcons: parseList(getEnv('CLOUDFLARE_AVAILABLE_ICONS')),
  requestHeaders
};

if (!CLOUDFLARE_CONFIG.availableIcons.length) {
  CLOUDFLARE_CONFIG.availableIcons = DEFAULT_AVAILABLE_ICONS;
}

const missingKeys = REQUIRED_KEYS.filter((key) => !getEnv(key));

if (missingKeys.length && isNodeRuntime && !process.env.CI) {
  console.warn(
    `[Cloudflare] Variables d'environnement manquantes: ${missingKeys.join(', ')}`
  );
}

export const DEFAULT_ICONS = DEFAULT_AVAILABLE_ICONS;

export default CLOUDFLARE_CONFIG;
