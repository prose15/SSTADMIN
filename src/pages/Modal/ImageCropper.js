import React, { useRef, useState } from 'react'
import { Card, Modal, CardBody, CardTitle, Button } from 'reactstrap';
import { useStateContext } from 'Context/ContextProvider';
import { db, storage } from "firebase-config";
import { collection, addDoc, Timestamp, getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import setCanvasPreview from './setCanvasPreview';
const ImageCropper = ({ url ,setPhoto }) => {
    const previewCanvasRef = useRef()
    const ASPECT_RATIO = 1
    const MIN_DIMENSION = 150
    const [err, setErr] = useState('')
    const imgRef = useRef()
    const imageElement = new Image()
    imageElement.src = url
    imageElement.addEventListener('load', (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
            setErr('Image must be 150 X 150 pixels')
            return url = ''
        }
    })
    const nav = useNavigate()
    const [crop, setCrop] = useState()
    const onImgLoad = (e) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
            setErr('Image must be 150 X 150 pixels')
            url = ''
            return
        }
        const crop = makeAspectCrop({
            unit: '%',
            width: 25
        },
            ASPECT_RATIO,
            width, height
        )
        const centeredCrop = centerCrop(crop, height, width)
        setCrop(centeredCrop)
    }
    const { profileModal, setProfileModal } = useStateContext()
    function tog_backdrop() {
        setProfileModal(!profileModal);
    }
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
    
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
    
        return new File([u8arr], filename, { type: mime });
    }

    return (
        <Modal
            isOpen={profileModal}
            toggle={() => {
                tog_backdrop();
            }}
            backdrop={'static'}
            id="staticBackdrop"
        >
            <div className="modal-header">
                <b><i className='bx bx-image' /> Crop Image</b>
                <button type="button" className="btn-close"
                    onClick={() => {
                        setProfileModal(false);
                    }} aria-label="Close"></button>
            </div>
            <div className="modal-body ">
                <div className='text-center'>
                    {
                        err && (<p>{err}</p>)
                    }
                    {
                        url && (<ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percetageCrop) => setCrop(percetageCrop)}
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                        >
                            <img ref={imgRef} src={url} style={{ maxHeight: '70vh' }} onLoad={onImgLoad} />
                        </ReactCrop>)
                    }
                </div>


            </div>
            <div className="modal-footer mx-auto">
                <button type='button' className='btn btn-primary' onClick={() => {
                    setCanvasPreview(
                        imgRef.current,
                        previewCanvasRef.current,
                        convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height
                        )
                    )
                    const dataUrl = previewCanvasRef.current.toDataURL();
                   const croppedImg= dataURLtoFile(dataUrl,'profilePic')
                    setPhoto(croppedImg)
                    setProfileModal(!profileModal);
                }}>
                    Crop Image</button>
                <canvas ref={previewCanvasRef} className="rounded-circle d-none" />
            </div>
        </Modal>



    )
}

export default ImageCropper