import yaml from 'js-yaml';
import parseIni from './parseIni';

export default {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': parseIni,
};
