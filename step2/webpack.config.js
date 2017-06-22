module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
}