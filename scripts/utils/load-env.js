const fs = require('fs');
const path = require('path');

const visitedFiles = new Set();

const parseLine = (line) => {
  if (!line || !line.trim() || line.trim().startsWith('#')) {
    return null;
  }

  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (!match) {
    return null;
  }

  const [, key, rawValue] = match;
  let value = rawValue.trim();

  const hasDoubleQuotes = value.startsWith('"') && value.endsWith('"');
  const hasSingleQuotes = value.startsWith("'") && value.endsWith("'");

  if (hasDoubleQuotes || hasSingleQuotes) {
    value = value.slice(1, -1);
  }

  value = value.replace(/\\n/g, '\n').replace(/\\r/g, '\r');

  return { key, value };
};

const loadEnvFile = (filePath) => {
  if (!filePath || visitedFiles.has(filePath)) {
    return;
  }

  visitedFiles.add(filePath);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      const parsed = parseLine(line);
      if (!parsed) {
        return;
      }

      const { key, value } = parsed;
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      // eslint-disable-next-line no-console
      console.warn(`[env] Impossible de charger ${filePath}: ${error.message}`);
    }
  }
};

const loadProjectEnv = () => {
  const projectRoot = path.resolve(__dirname, '..', '..');
  const envFiles = [
    path.resolve(projectRoot, '.env.local'),
    path.resolve(projectRoot, '.env')
  ];

  envFiles.forEach(loadEnvFile);
};

module.exports = {
  loadEnvFile,
  loadProjectEnv
};
