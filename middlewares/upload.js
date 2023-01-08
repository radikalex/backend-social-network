const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mimetypes = ["image/png", "image/jpg", "image/jpeg"];

const generateMulter = (imgFolderName) =>
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const dir_img = path.resolve(
                    `./images/${imgFolderName}/uploads`
                );
                if (!fs.existsSync(dir_img)) {
                    fs.mkdirSync(dir_img);
                }
                cb(null, `./images/${imgFolderName}/uploads`);
            },
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                switch (imgFolderName) {
                    case "users_images":
                        req.body.user_img = "users_images/uploads/" + filename;
                        break;
                    case "posts_images":
                        req.body.post_img = "posts_images/uploads/" + filename;
                        break;
                }
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (mimetypes.includes(file.mimetype)) cb(null, true);
            else cb(null, false);
        },
    });
const uploadUserImages = generateMulter("users_images");
const uploadPostImages = generateMulter("posts_images");

module.exports = { uploadUserImages, uploadPostImages };
