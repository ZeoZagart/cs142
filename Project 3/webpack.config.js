const path = require('path');
module.exports = {
    devtool: 'eval-source-map',
    entry: './tsfiles/DatePicker.ts',
    module: {
        rules: [{
            test:/\.ts$/,
            use: 'ts-loader',
            include: path.resolve(__dirname, 'tsfiles')
        }]
    },
    resolve: {
        extensions:['.ts','.js'],
    },
    output: {
        publicPath:'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }

}