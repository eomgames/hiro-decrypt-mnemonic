const path = require('path');

module.exports = {
    mode: 'production',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'bundle.js',
    },
    module: {
        // Makes WebPack think that we don't need to parse this module,
        // otherwise it tries to recompile it, but fails
        //
        // Error: Module not found: Error: Can't resolve 'env'
        noParse: /\.wasm$/,
        rules: [
            {
                test: /\.wasm$/,
                // Tells WebPack that this module should be included as
                // base64-encoded binary file and not as code
                loader: 'base64-loader',
                // Disables WebPack's opinion where WebAssembly should be,
                // makes it think that it's not WebAssembly
                //
                // Error: WebAssembly module is included in initial chunk.
                type: 'javascript/auto',
            },
        ],
    },
    resolve: {
        // We're using different node.js modules in our code,
        // this prevents WebPack from failing on them or embedding
        // polyfills for them into the bundle.
        //
        // Error: Module not found: Error: Can't resolve 'fs'
        fallback: {
            path: false,
            fs: false,
            Buffer: false,
            process: false,
        },
    },
};
