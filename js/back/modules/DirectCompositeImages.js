export default class DirectCompositeImages {
    constructor(params, resolve) {
        return (async () => {
            let data = {
                image: params.image,
                mask: params.mask,
                crop: params.crop
            };
    
            $.post("../../api/composite-images", data, (response) => {
                resolve(response.result);
            });
        })();
    }
}
