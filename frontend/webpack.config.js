const path = require('path');

module.exports = {
    // Точка входа в ваше приложение
    entry: './src/index.js',
    
    // Выходная конфигурация
    output: {
        // Абсолютный путь к выходной директории
        path: path.resolve(__dirname, 'dist'),
        // Имя выходного файла
        filename: 'bundle.js',
    },
    
    // Разрешение путей и алиасов
    resolve: {
        alias: {
            // Абсолютный путь к директории src
            '@': path.resolve(__dirname, 'src'),
            // Абсолютный путь к директории src/components
            '@components': path.resolve(__dirname, 'src/components'),
            // Абсолютный путь к директории src/assets
            '@assets': path.resolve(__dirname, 'src/assets'),
            // Другие алиасы по необходимости
        },
        extensions: ['.js', '.jsx', '.json'], // Разрешение для расширений файлов
    },
    
    // Модули и правила для обработки файлов
    module: {
        rules: [
            {
                // Правило для обработки JS и JSX файлов
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                // Правило для обработки CSS файлов
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Правило для обработки SVG файлов
                test: /\.svg$/,
                use: 'file-loader',
            },
            {
                // Правило для обработки изображений
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                // Правило для обработки шрифтов
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    
    // Плагины (если есть)
    plugins: [
        // Ваши плагины
    ],

    // Настройки для режима разработки
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
