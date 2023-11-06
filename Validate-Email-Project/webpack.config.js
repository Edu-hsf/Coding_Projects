const path = require('path')

module.exports = {
    entry: {
        homePage: './src/home.js',
        successPage: './src/successPage.js'
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].min.js'
    },

    mode: 'development',
}