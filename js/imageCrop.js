

const CROP_WIDTH = 450;
const CROP_HEIGHT = 350;


function cropImage(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = CROP_WIDTH;
            canvas.height = CROP_HEIGHT;

            const ctx = canvas.getContext("2d");

            // Calculate center crop
            const sourceAspect = img.width / img.height;
            const targetAspect = CROP_WIDTH / CROP_HEIGHT;

            let sourceWidth, sourceHeight, sourceX, sourceY;

            if (sourceAspect > targetAspect) {
                sourceHeight = img.height;
                sourceWidth = sourceHeight * targetAspect;
                sourceX = (img.width - sourceWidth) / 2;
                sourceY = 0;
            } else {
                sourceWidth = img.width;
                sourceHeight = sourceWidth / targetAspect;
                sourceX = 0;
                sourceY = (img.height - sourceHeight) / 2;
            }

            ctx.drawImage(
                img,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                CROP_WIDTH,
                CROP_HEIGHT
            );

            const croppedBase64 = canvas.toDataURL("image/jpeg", 0.9);
            callback(croppedBase64);
        };
    };

    reader.readAsDataURL(file);
}
