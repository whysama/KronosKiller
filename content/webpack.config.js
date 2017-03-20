const path = require('path');

module.exports = {

    entry: [
        './content/src/scripts/index.js'
    ],

    output: {
        filename: 'content.js',
        path: path.join(__dirname, '../', 'build'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        modules: ['node_modules']
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jsx|js)?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }],
            exclude: /(node_modules)/,
            include: path.join(__dirname, 'src'),
        }]
    }
};
