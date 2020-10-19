const multer  = require('multer');

const {
  createPathDestination
} = require('../config');

const avatarUploader = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, createPathDestination());
        },

        filename: function (req, file, cb) {
            const fileType = file.mimetype.split('/')[1];
            if (
                    fileType !== 'png' &&
                    fileType !== 'jpeg' && 
                    fileType !== 'jpg'
                ) {
                    return cb (new Error('File must be as picture'));
                }
          cb(null, `${req.userId}.png`);
        }
      });
     return multer({ storage: storage }).single('avatar');
};

module.exports = {
    avatarUploaderMiddleware: avatarUploader(),
};