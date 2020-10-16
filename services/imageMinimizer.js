const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const imageMinimizer = async (userId) => {
    const MINIFIED_DIR = 'public/images';

    await imagemin(['tmp'], {
        destination: MINIFIED_DIR,
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
};
// imageMinimizer('5f89e5df9212c03dcc04c1e9');

module.exports = {
    imageMinimizer,
};