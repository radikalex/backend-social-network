const multer = require('multer');
const fs = require("fs");
const path = require('path');
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

const generateMulter = imgFolderName => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.resolve('./uploads');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            const dir_img = path.resolve(`./uploads/${imgFolderName}`);
            if (!fs.existsSync(dir_img)) {
                fs.mkdirSync(dir_img);
            }
            cb(null, `./uploads/${imgFolderName}`)
        },
        filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            switch(imgFolderName) {
                case 'users_images':
                    req.body.user_img = "uploads/users_images/" + filename;
                    break;
                case 'posts_images':
                    req.body.post_img = "uploads/posts_images/" + filename;
                    break;
                case 'comments_images':
                    req.body.comment_img = "uploads/comments_images/" + filename;
                    break;
            }
            cb(null, filename)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (mimetypes.includes(file.mimetype)) cb(null, true)
        else cb(null, false)
    }
});
const uploadUserImages = generateMulter('users_images');
const uploadPostImages = generateMulter('posts_images');
const uploadCommentImages = generateMulter('comments_images');



module.exports = { uploadUserImages, uploadPostImages, uploadCommentImages };