import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './index.js',
    output: {
        path: path.resolve(dirname, 'dist'),
        filename: 'webpack.bundle.js'
    }
}
