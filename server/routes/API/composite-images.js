const express = require('express');
const router = express.Router();

// Import module
const Jimp = require("jimp");

module.exports = function () {
    // Route: /api/composite-images
    router.post('/composite-images', function(req, res) {
        let image = req.body.image;
        let mask = req.body.mask;
    
        (async function process () {
            const imageBuffer = await Jimp.read(Buffer.from(image.slice(image.indexOf('base64') + 7), 'base64'));
            const maskBuffer = await Jimp.read(Buffer.from(mask.slice(mask.indexOf('base64') + 7), 'base64'));
    
            imageBuffer.mask(maskBuffer, 0, 0).getBase64(Jimp.MIME_PNG, (error, result) => {
                if (error) console.log(error);
                
                res.json({
                    result: result
                });
            });
        })();
    });
    
    return router;
};
