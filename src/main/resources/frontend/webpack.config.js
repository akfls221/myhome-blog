const path = require('path');
const refreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require('webpack');

module.exports ={
    mode: 'development', // 모드 (개발용 // 실서비스 : production)
    devtool: 'eval', //빠르게 하겠다
    resolve:{
        extensions:['.jsx', '.js'],
    },
    entry:{
        app:['./render/app',]
    },
    module :{
        rules:[{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options:{
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins:['react-refresh/babel',],
            }},
            { test: /\.css$/, use:['css-loader']},
        ],
    },
    plugins: [
        new refreshPlugin(),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
        }),
    ],
    output: {
        filename: '[name].js', //entry에 있는 main 등이 이름이 js파일로 생성됨. https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d
        path: path.join(__dirname, 'dist'), //__dirname : 현재폴더 / (__dirname, 'dist')  : 현재폴더/dist
        publicPath: '/dist/',
    },
    devServer: { //프론트개발 편의를 위해 잠깐두는 서버
        historyApiFallback: true,
        devMiddleware: { publicPath: '/dist/' },
        static: { directory: path.resolve(__dirname) }, //static: index.html(실제 존재하는 정적파일들의 경로를 적어줌//index.html이 다른경로에 있을경우 { directory: path.resolve(__dirname), '경로명'}
        hot: true
    },
};