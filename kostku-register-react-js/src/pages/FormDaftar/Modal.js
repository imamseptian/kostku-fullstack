import React from "react";

const Modal = () => {
  return (
    <Modal
      isOpen={showModalKTP}
      // onAfterOpen={() => alert("open")}
      onRequestClose={() => setshowModalKTP(false)}
      style={customStyles}
      contentLabel="Example Modal"
      // className="w-1/2 h-1/2 top-1/2 left-1/2"
    >
      {oriKTP && (
        <div className="flex flex-col items-center">
          <ReactCrop
            src={oriKTP}
            onImageLoaded={setImageKTP}
            crop={cropKTP}
            onChange={(newcrop) => setCropKTP(newcrop)}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
            }}
          />
          {/* <p>{JSON.stringify(src)}</p> */}
          <button
            // onClick={getCroppedImg}
            onClick={() => {
              getCroppedImg(setresultKTP, imageKTP, cropKTP);
              setshowModalKTP(false);
            }}
          >
            Ambil Foto KTP
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Modal;
