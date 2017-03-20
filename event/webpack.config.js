const path = require('path');

module.exports = {

    entry: [
        './event/src/index.js'
    ],

    output: {
        filename: 'event.js',
        path: path.join(__dirname, '../', 'build')
    },

    resolve: {
        extensions: ['.js', '.json'],
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
