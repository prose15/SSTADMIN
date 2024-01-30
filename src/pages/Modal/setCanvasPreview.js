const setCanvasPreview=(
    image,
    canvas,
    crop
)=>{
    const ctx=canvas.getContext('2d')
    if(!ctx){
        throw new Error('No 2d Error')
    }
    const pixelRatio = window.devicePixelRatio;
    const scaleX=image.naturalWidth/image.width;
    const scaleY=image.naturalHeight/image.height;
    canvas.width = Math.floor(crop.width*scaleX*pixelRatio)
    canvas.height = Math.floor(crop.height*scaleY*pixelRatio)
    ctx.scale(pixelRatio,pixelRatio)
    ctx.imageSmoothingQuality='high'
    ctx.save()

    const cropx=crop.x*scaleX
    const cropy=crop.y*scaleY

    ctx.translate(-cropx,-cropy)
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
    )
    ctx.restore();
}
export default setCanvasPreview;