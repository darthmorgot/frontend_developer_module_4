const pathNode = require('node:path');
const path = require('../paths');

const PugPlugin = require('pug-plugin');

const keepPugFolderStructure = (pathData) => {
  const sourceFile = pathData.filename;
  const relativeFilePath = pathNode.relative(path.src, sourceFile);
  const {dir, name} = pathNode.parse(relativeFilePath);

  return name === 'index' ? `${name}.html` : `${dir}/${name}.html`;
};

const pugPlugin = (mode) => {
  return new PugPlugin({
    pretty: mode,
    js: {
      filename: mode ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash:8].js',
    },
    css: {
      filename: mode ? 'assets/css/[name].css' : 'assets/css/[name].[contenthash:8].css',
    },
    filename: keepPugFolderStructure,
  });
};

module.exports = pugPlugin;
