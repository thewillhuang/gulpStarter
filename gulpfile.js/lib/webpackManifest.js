import path from 'path';
import fs from 'fs';

export default function (publicPath, dest, filenames) {
  const filename = filenames || 'rev-manifest.json';

  return function plugin() {
    this.plugin('done', stats => {
      const stat = stats.toJson();
      const chunks = stat.assetsByChunkName;
      const manifest = {};

      for (var key in chunks) {
        // const originalFilename = key + '.js';
        manifest[path.join(publicPath, `${key}.js`)] = path.join(publicPath, chunks[key][0]);
      }
      // console.log(manifest);

      fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest)
      );
    });
  };
}
