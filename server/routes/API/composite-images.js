const express = require('express');
const router = express.Router();

// Import module
const Jimp = require("jimp");

module.exports = function () {
    // Route: /api/composite-images
    router.post('/composite-images', function(req, res) {
        let image = req.body.image;
        let mask = req.body.mask;
        let crop = req.body.crop;
        
        if (crop) {
            crop = {
                x: Number(req.body.crop.x),
                y: Number(req.body.crop.y),
                w: Number(req.body.crop.w),
                h: Number(req.body.crop.h)
            };
        }
    
        (async function process () {
            const imageBuffer = await Jimp.read(Buffer.from(image.slice(image.indexOf('base64') + 7), 'base64'));
            const maskBuffer = await Jimp.read(Buffer.from(mask.slice(mask.indexOf('base64') + 7), 'base64'));
            
            let buffer;
    
            async function getBuffer () {
                if (crop) {
                    imageBuffer.mask(maskBuffer, 0, 0).crop(crop.x, crop.y, crop.w, crop.h).getBase64(Jimp.MIME_PNG, (error, result) => {
                        if (error) {
                            console.log(error);
                            
                            return res.json({
                                result: error
                            });
                        }
                        
                        buffer = result;
                    });
                } else {
                    imageBuffer.mask(maskBuffer, 0, 0).getBase64(Jimp.MIME_PNG, (error, result) => {
                        if (error) console.log(error);
                        buffer = result;
                    });
                }
                
                return buffer;
            }
    
            await res.json({
                result: await getBuffer()
            });
        })();
    });
    
    return router;
};
