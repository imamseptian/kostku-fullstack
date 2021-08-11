import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "react-modal";

const CobaCrop = () => {
  const [src, selectFile] = useState(null);

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
    setIsOpen(true);
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      //   marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: window.innerWidth > 700 ? "65%" : "90%",
      maxHeight: "90%",
    },
    overlay: { zIndex: 1000 },
  };

  const [image, setImage] = useState(null);
  const [crop, setcrop] = useState({
    aspect: 3 / 2,
    width: 120,
    height: 80,
    x: 50,
    y: 50,
  });

  const [result, setresult] = useState(null);

  const getCroppedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    // canvas.width = 720;
    // canvas.height = 480;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // canvas.toBlob(blob=>{
    //     setresult(blob)
    // })

    // // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    setresult(base64Image);

    // // As a blob
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     blob.name = fileName;
    //     resolve(blob);
    //   }, 'image/jpeg', 1);
    // });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={() => alert("open")}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        // className="w-1/2 h-1/2 top-1/2 left-1/2"
      >
        {src && (
          <div className="flex flex-col items-center">
            <ReactCrop
              src={src}
              onImageLoaded={setImage}
              crop={crop}
              onChange={(newcrop) => setcrop(newcrop)}
              style={{
                maxWidth: "80%",
                maxHeight: "80%",
              }}
            />
            {/* <p>{JSON.stringify(src)}</p> */}
            <button
              // onClick={getCroppedImg}
              onClick={() => {
                getCroppedImg();
                setIsOpen(false);
              }}
            >
              CROP IMAGE
            </button>
          </div>
        )}
      </Modal>
      <div className="flex flex-col shadow-md lg:w-4/5 md:w-3/4 sm:w-full mx-auto bg-white rounded-md py-3">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Foto KTP {window.innerWidth}
          </label>
          <input
            className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
            id="grid-first-name"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg,image/jpg"
          ></input>
          <div className="w-full">
            {result && (
              <div>
                <img src={result} className="lg:h-56 h-auto lg:w-auto w-full" />
              </div>
            )}
          </div>

          {/* <input
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
          id="grid-first-name"
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg,image/jpg"
        ></input> */}

          {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
      </div>
    </div>
  );
};

export default CobaCrop;
