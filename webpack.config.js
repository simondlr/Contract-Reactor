module.exports = {
    entry: [
        "./script.jsx"
    ],
    output: {
        path: __dirname+"/dist",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel"},
          { test: /\.jsx$/, exclude: /node_modules/, loader: "babel"},
          { test: /\.json$/, loader: "json" },
          { test: /\.css$/, loader: "style!css" }, //bootstrap
          { test: /\.gif/, loader: 'url?limit=10000&mimetype=image/gif' },
          { test: /\.jpg/, loader: 'url?limit=10000&mimetype=image/jpg' },
          { test: /\.png/, loader: 'url?limit=10000&mimetype=image/png' },
          { test: /\.(woff|woff2)$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }  
        ]
    }
};
