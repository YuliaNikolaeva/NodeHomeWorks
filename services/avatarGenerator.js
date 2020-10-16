const AvatarGenerator = require('avatar-generator');
const path = require("path");
const directory = './tmp/';
const sprites = '../node_modules/avatar-generator/img';

const generateAvatar = async (userId) => {
    const avatar = new AvatarGenerator({
        parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], 
        partsLocation: path.join(
            __dirname, 
            sprites
        ), 
        imageExtension: '.png'
    })
    
    const variant = 'female';
    const image = await avatar.generate(userId, variant)

   return await image.png().toFile(`${directory}${userId}.png`);
}

module.exports = {
    generateAvatar,
  };
