import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import placeholder from "../../assets/img/blank.png";
import { useHistory } from "react-router-dom";
import { APIUrl } from "../../functions/MyVar";
// import Cropper from "react-easy-crop";
import Modal from "react-modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const MainForm = () => {
  const { id_kelas, id_kamar } = useParams();
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id_kamar]);

  // MODAL VARIABLE
  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     //   marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     width: window.innerWidth > 700 ? "65%" : "90%",
  //     maxHeight: "90%",
  //   },
  //   overlay: { zIndex: 1000 },
  // };

  // const [showModalKTP, setshowModalKTP] = useState(false);
  // const [showModalDiri, setshowModalDiri] = useState(false);

  // const [oriKTP, setoriKTP] = useState(null);
  // const [oriDiri, setoriDiri] = useState(null);

  // const [imageKTP, setImageKTP] = useState(null);
  // const [imageDiri, setImageDiri] = useState(null);

  // const [cropKTP, setCropKTP] = useState({
  //   aspect: 3 / 2,
  //   width: 120,
  //   height: 80,
  //   x: 50,
  //   y: 50,
  // });

  // const [cropDiri, setCropDiri] = useState({
  //   aspect: 3 / 2,
  //   width: 120,
  //   height: 80,
  //   x: 50,
  //   y: 50,
  // });

  // const [resultKTP, setresultKTP] = useState(null);
  // const [resultDiri, setresultDiri] = useState(null);

  // const getCroppedImg = (callback, image, crop) => {
  //   const canvas = document.createElement("canvas");
  //   const scaleX = image.naturalWidth / image.width;
  //   const scaleY = image.naturalHeight / image.height;
  //   canvas.width = crop.width;
  //   canvas.height = crop.height;
  //   const ctx = canvas.getContext("2d");
  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,

  //     crop.width,
  //     crop.height
  //   );
  //   console.log(image.naturalWidth);
  //   console.log(image.naturalHeight);
  //   const base64Image = canvas.toDataURL("image/jpeg");
  //   // setresult(base64Image);
  //   callback(base64Image);
  // };

  const [pendaftar, setpendaftar] = useState({
    nama: "",
    kelamin: null,
    provinsi: null,
    kota: null,
    alamat: "",
    email: "",
    notelp: "",
    noktp: "",
    // foto_ktp: "",
    // foto_diri: "",
    status_pekerjaan: null,
    status_hubungan: null,
    request_kamar: id_kamar,
    tempat_kerja_pendidikan: "",
    pesan: null,
    status_barang: false,
    barang_tambahan: [],
    tanggal_lahir: moment(new Date()).format("YYYY-MM-DD"),
  });

  const [errorMsg, seterrorMsg] = useState({
    nama: null,
    kelamin: null,
    provinsi: null,
    kota: null,
    alamat: null,
    email: null,
    notelp: null,
    noktp: null,
    foto_ktp: null,
    foto_diri: null,
    status_pekerjaan: null,
    status_hubungan: null,
    tempat_kerja_pendidikan: null,
    tanggal_lahir: null,
  });

  // const [baseFotoKTP, setbaseFotoKTP] = useState(placeholder);
  // const [baseFotoDiri, setbaseFotoDiri] = useState(placeholder);

  const [{ altKTP, srcKTP }, setImgKTP] = useState({
    srcKTP: placeholder,
    altKTP: "Upload an Image",
  });

  const [{ altDiri, srcDiri }, setImgDiri] = useState({
    srcDiri: placeholder,
    altDiri: "Upload an Image",
  });

  const [inputList, setInputList] = useState([]);

  const [dataProvinsi, setdataProvinsi] = useState([]);
  const [dataKota, setdataKota] = useState([]);

  // useEffect(() => {
  //   // setpendaftar({ ...pendaftar, barang_tambahan: JSON.stringify(inputList) });
  //   setpendaftar({ ...pendaftar, barang_tambahan: inputList });
  // }, [inputList]);

  // useEffect(() => {
  //   // setpendaftar({ ...pendaftar, barang_tambahan: JSON.stringify(inputList) });
  //   setpendaftar({ ...pendaftar, barang_tambahan: inputList });
  // }, [inputList]);

  const setForm = (field, value) => {
    setpendaftar({ ...pendaftar, [field]: value });
  };

  useEffect(() => {
    axios
      .get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
      .then((res) => {
        // console.log(res.data);

        setdataProvinsi(res.data.provinsi);
      })
      .catch((error) => {
        // console.log(ProvURL);
        console.log(error);
        console.log("error boss");
      });
  }, []);

  useEffect(() => {
    if (pendaftar.provinsi !== undefined) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${pendaftar.provinsi}`
        )
        .then((response) => {
          // console.log(response.data);
          // console.log(URLkota);
          setdataKota(response.data.kota_kabupaten);
        });
    }

    setForm("kota", null);
  }, [pendaftar.provinsi]);

  const handleInputChange = (e, index, inputType) => {
    const list = [...inputList];
    list[index][inputType] = e;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { nama: "", qty: 1, error: "" }]);
  };

  const submitData = () => {
    inputList.forEach((x, i) => {
      x.error = "";
    });
    axios
      .post(APIUrl + "/api/daftarkost", {
        ...pendaftar,
        foto_ktp: srcKTP,
        foto_diri: srcDiri,
        barang_tambahan: inputList,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // history.replace("/detail-kelas/" + id_kelas);
          alert("sukses");
        } else {
          inputList.forEach((x, i) => {
            let nameError = "barang_tambahan." + i + ".nama";
            if (response.data.errors[nameError] != undefined) {
              // handleInputChange;
              handleInputChange(response.data.errors[nameError][0], i, "error");
            }
          });

          seterrorMsg({
            nama: response.data.errors.nama ? response.data.errors.nama : null,

            kelamin: response.data.errors.kelamin
              ? response.data.errors.kelamin
              : null,
            provinsi: response.data.errors.provinsi
              ? response.data.errors.provinsi
              : null,
            kota: response.data.errors.kota ? response.data.errors.kota : null,
            alamat: response.data.errors.alamat
              ? response.data.errors.alamat
              : null,
            email: response.data.errors.email
              ? response.data.errors.email
              : null,
            notelp: response.data.errors.notelp
              ? response.data.errors.notelp
              : null,
            noktp: response.data.errors.noktp
              ? response.data.errors.noktp
              : null,
            foto_ktp: response.data.errors.foto_ktp
              ? response.data.errors.foto_ktp
              : null,
            foto_diri: response.data.errors.foto_diri
              ? response.data.errors.foto_diri
              : null,
            status_pekerjaan: response.data.errors.status_pekerjaan
              ? response.data.errors.status_pekerjaan
              : null,
            status_hubungan: response.data.errors.status_hubungan
              ? response.data.errors.status_hubungan
              : null,
            tempat_kerja_pendidikan: response.data.errors
              .tempat_kerja_pendidikan
              ? response.data.errors.tempat_kerja_pendidikan
              : null,
            tanggal_lahir: response.data.errors.tanggal_lahir
              ? response.data.errors.tanggal_lahir
              : null,
          });
          if (response.data.errors.barang_tambahan) {
            console.log("aso");
          }
          window.scrollTo(0, 0);
        }

        // if (data.success) {
        //   // navigation.pop(1);
        //   const dataPengguna = data.user;
        //   console.log('sukses matamu ', data);
        //   let topic = 'kostku-' + data.data.id;

        //   fcmService.subscribeToTopic(topic);
        //   dispatch(setUserRedux(dataPengguna));

        //   // console.log(data);
        //   goToHome();
        // } else {
        //   seterrorMsg({
        //     nama: data.errors.nama ? data.errors.nama : '',
        //     provinsi: data.errors.provinsi ? data.errors.provinsi : '',
        //     kota: data.errors.kota ? data.errors.kota : '',
        //     alamat: data.errors.alamat ? data.errors.alamat : '',
        //     jenis: data.errors.jenis ? data.errors.jenis : '',
        //     notelp: data.errors.notelp ? data.errors.notelp : '',
        //     deskripsi: data.errors.deskripsi ? data.errors.deskripsi : '',
        //   });
        //   setIsSubmit(false);
        //   goToTop();
        // }

        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(pendaftar);
      });
  };

  return (
    <div>
      <div className="flex flex-col shadow-md lg:w-4/5 md:w-3/4 sm:w-full mx-auto bg-white rounded-md py-3">
        <div className="bg-white px-8 pt-6 pb-8 mb-4 flex flex-col">
          {/* row 1 */}
          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Nama Lengkap
              </label>
              <input
                className={`appearance-none block ${
                  errorMsg.nama !== null && "ring-2 ring-red-500"
                } w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
                type="text"
                placeholder="Nama Lengkap"
                value={pendaftar.nama}
                onChange={(e) => {
                  if (e.target.value !== null) {
                    setForm("nama", e.target.value);
                  }
                }}
              />
              {errorMsg.nama !== null && (
                <p className="text-red text-xs italic">{errorMsg.nama}</p>
              )}
            </div>
          </div>

          {/* row 2  */}
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-state"
              >
                Kelamin
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none ${
                    errorMsg.kelamin !== null && "ring-2 ring-red-500"
                  } w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`}
                  value={pendaftar.kelamin}
                  onChange={(e) => {
                    if (e.target.value !== null) {
                      setForm("kelamin", parseInt(e.target.value));
                    }
                  }}
                >
                  <option>Jenis Kelamin</option>
                  <option value={1}>Laki-Laki</option>
                  <option value={2}>Perempuan</option>
                </select>
                <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errorMsg.kelamin !== null && (
                <p className="text-red text-xs italic">{errorMsg.kelamin}</p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Tanggal Lahir
              </label>
              <input
                className={`appearance-none ${
                  errorMsg.tanggal_lahir !== null && "ring-2 ring-red-500"
                } block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4`}
                type="date"
                placeholder="Tanggal Lahir"
                value={pendaftar.tanggal_lahir}
                onChange={(e) => {
                  console.log("pick tanggal :", e.target.value);
                  setForm("tanggal_lahir", e.target.value);
                  // setStartDate(e.target.value);
                }}
              />
              {errorMsg.tanggal_lahir !== null && (
                <p className="text-red text-xs italic">
                  {errorMsg.tanggal_lahir}
                </p>
              )}
            </div>
          </div>

          {/* row 2.5 */}

          {/* row 3  */}
          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Provinsi
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none ${
                    errorMsg.provinsi !== null && "ring-2 ring-red-500"
                  } w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`}
                  onChange={(e) => {
                    if (e.target.value !== undefined) {
                      setForm("provinsi", parseInt(e.target.value));
                      // console.log(e.target.value);
                    }
                  }}
                  value={pendaftar.provinsi}
                >
                  <option>Pilih Provinsi</option>
                  {dataProvinsi.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.nama}
                      </option>
                    );
                  })}
                </select>
                <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errorMsg.provinsi !== null && (
                  <p className="text-red text-xs italic">{errorMsg.provinsi}</p>
                )}
              </div>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-state"
              >
                Kota
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none ${
                    errorMsg.kota !== null && "ring-2 ring-red-500"
                  } w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`}
                  onChange={(e) => {
                    if (e.target.value !== undefined) {
                      setForm("kota", parseInt(e.target.value));
                      // console.log(e.target.value);
                    }
                  }}
                  value={pendaftar.kota}
                >
                  <option>Pilih Kota</option>
                  {dataKota.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.nama}
                      </option>
                    );
                  })}
                </select>
                <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errorMsg.kota !== null && (
                  <p className="text-red text-xs italic">{errorMsg.kota}</p>
                )}
              </div>
            </div>
            {/* <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Alamat
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              type="text"
              placeholder="Alamat"
              value={pendaftar.alamat}
              onChange={(e) => {
                if (e.target.value !== null) {
                  setForm("alamat", e.target.value);
                }
              }}
            />

         
          </div> */}
          </div>

          {/* row 4  */}

          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Alamat
              </label>
              <input
                className={`appearance-none block w-full ${
                  errorMsg.alamat !== null && "ring-2 ring-red-500"
                } bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
                type="text"
                placeholder="Alamat"
                value={pendaftar.alamat}
                onChange={(e) => {
                  if (e.target.value !== null) {
                    setForm("alamat", e.target.value);
                  }
                }}
              />
              {errorMsg.alamat !== null && (
                <p className="text-red text-xs italic">{errorMsg.alamat}</p>
              )}
            </div>
          </div>

          {/* section email  */}
          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Email
              </label>
              <input
                className={`appearance-none block ${
                  errorMsg.email !== null && "ring-2 ring-red-500"
                } w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
                type="text"
                placeholder="Email"
                value={pendaftar.email}
                onChange={(e) => {
                  if (e.target.value !== null) {
                    setForm("email", e.target.value);
                  }
                }}
              />
              {errorMsg.email !== null && (
                <p className="text-red text-xs italic">{errorMsg.email}</p>
              )}
            </div>
          </div>

          {/* row 4.5 */}

          {/* row 5  */}
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Nomor HP
              </label>
              <input
                className={`appearance-none block ${
                  errorMsg.notelp !== null && "ring-2 ring-red-500"
                } w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4`}
                type="text"
                placeholder="No HP"
                value={pendaftar.notelp.toString()}
                onChange={(e) => {
                  let tempHP = e.target.value;
                  let regex = /^[0-9\b]+$/;

                  // if value is not blank, then test the regex
                  if (tempHP === "" || regex.test(tempHP)) {
                    setForm("notelp", e.target.value);
                  }
                  // setForm("notelp", e.target.value);
                }}
                // value={pendaftar.nama_depan}
                // onChange={(e) => {
                //   if (e.target.value !== null) {
                //     setForm("nama_depan", e.target.value);
                //   }
                // }}
              />
              {errorMsg.notelp !== null && (
                <p className="text-red text-xs italic">{errorMsg.notelp}</p>
              )}

              {/* error message  */}
              {/* <p className="text-red text-xs italic">
              Please fill out this field.
            </p> */}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Nomor KTP
              </label>
              <input
                className={`appearance-none block ${
                  errorMsg.noktp !== null && "ring-2 ring-red-500"
                } w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4`}
                type="text"
                placeholder="No KTP"
                value={pendaftar.noktp.toString()}
                onChange={(e) => {
                  let tempKTP = e.target.value;
                  let regex = /^[0-9\b]+$/;

                  // if value is not blank, then test the regex
                  if (tempKTP === "" || regex.test(tempKTP)) {
                    setForm("noktp", e.target.value);
                  }
                }}
              />
              {errorMsg.noktp !== null && (
                <p className="text-red text-xs italic">{errorMsg.noktp}</p>
              )}
            </div>
          </div>

          {/* row 5.8 */}

          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Foto KTP
            </label>
            <input
              className={`appearance-none ${
                errorMsg.foto_ktp !== null && "ring-2 ring-red-500"
              } block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
              id="grid-first-name"
              type="file"
              // onChange={(e) => {
              //   if (e.target.files[0]) {
              //     setImg({
              //       src: URL.createObjectURL(e.target.files[0]),
              //       alt: e.target.files[0].name,
              //     });
              //   }
              // }}
              onChange={(e) => {
                console.log("change kTP");

                let reader = new FileReader();
                let file = e.target.files[0];

                reader.onload = function (upload) {
                  setImgKTP({
                    srcKTP: upload.target.result,
                    altKTP: "FOTO KTP",
                  });
                  // console.log("SET KTP");
                };
                reader.readAsDataURL(file);
              }}
              accept="image/png, image/jpeg,image/jpg"
              // type={props.type}
              // placeholder={props.placeholder}
              // onChange={props.changeMyValue}
            ></input>
            {errorMsg.foto_ktp !== null && (
              <p className="text-red text-xs italic">{errorMsg.foto_ktp}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="my-2">
            <img src={srcKTP} alt={altKTP} className="h-56 w-auto" />
            {/* <img src={resultKTP} className="lg:h-56 h-auto lg:w-auto w-full" /> */}
          </div>

          {/* row foto Diri */}

          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Foto Diri
            </label>
            <input
              className={`appearance-none ${
                errorMsg.foto_diri !== null && "ring-2 ring-red-500"
              }
block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
              id="grid-first-name"
              type="file"
              // onChange={(e) => {
              //   if (e.target.files[0]) {
              //     setImg({
              //       src: URL.createObjectURL(e.target.files[0]),
              //       alt: e.target.files[0].name,
              //     });
              //   }
              // }}
              onChange={(e) => {
                console.log("change Diri");

                let reader = new FileReader();
                let file = e.target.files[0];

                // if (e.target.files[0]) {
                //   setImgDiri({
                //     srcDiri: URL.createObjectURL(e.target.files[0]),
                //     altDiri: e.target.files[0].name,
                //   });
                // }

                reader.onload = function (upload) {
                  // console.log(upload.target.result);
                  // setbaseFotoDiri(upload.target.result);
                  setImgDiri({
                    srcDiri: upload.target.result,
                    altDiri: "Foto Diri",
                  });
                  // self.setState({
                  //   image: upload.target.result,
                  // });
                };
                reader.readAsDataURL(file);
              }}
              accept="image/png, image/jpeg,image/jpg"
              // type={props.type}
              // placeholder={props.placeholder}
              // onChange={props.changeMyValue}
            ></input>
            {errorMsg.foto_diri !== null && (
              <p className="text-red text-xs italic">{errorMsg.foto_diri}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="my-2">
            <img
              src={srcDiri}
              alt={altDiri}
              className="lg:h-56 h-auto lg:w-auto w-full"
            />
          </div>

          {/* section status 2  */}

          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Status Hubungan
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none ${
                    errorMsg.status_hubungan !== null && "ring-2 ring-red-500"
                  } w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`}
                  onChange={(e) => {
                    if (e.target.value !== undefined) {
                      setForm("status_hubungan", parseInt(e.target.value));
                      // console.log(e.target.value);
                    }
                  }}
                  value={pendaftar.status_hubungan}
                >
                  <option>Pilih Status</option>
                  <option value={1}>Lajang</option>
                  <option value={2}>Menikah</option>
                </select>
                <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errorMsg.status_hubungan !== null && (
                  <p className="text-red text-xs italic">
                    {errorMsg.status_hubungan}
                  </p>
                )}
              </div>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-state"
              >
                Status Kerja
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none ${
                    errorMsg.status_pekerjaan !== null && "ring-2 ring-red-500"
                  } w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`}
                  onChange={(e) => {
                    if (e.target.value !== undefined) {
                      setForm("status_pekerjaan", parseInt(e.target.value));
                      // console.log(e.target.value);
                    }
                  }}
                  value={pendaftar.status_pekerjaan}
                >
                  <option>Pilih Status</option>
                  <option value={1}>Pelajar</option>
                  <option value={2}>Pekerja</option>
                </select>
                <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errorMsg.status_pekerjaan !== null && (
                  <p className="text-red text-xs italic">
                    {errorMsg.status_pekerjaan}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Alamat
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              type="text"
              placeholder="Alamat"
              value={pendaftar.alamat}
              onChange={(e) => {
                if (e.target.value !== null) {
                  setForm("alamat", e.target.value);
                }
              }}
            />

         
          </div> */}
          </div>

          {/* <div className="-mx-3 mb-3">
          <div className=" px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-state"
            >
              Status
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                onChange={(e) => {
                  if (e.target.value !== undefined) {
                    setForm("status", parseInt(e.target.value));
                    // console.log(e.target.value);
                  }
                }}
                value={pendaftar.status}
              >
                <option>Status</option>
                <option value={1}>Pelajar</option>
                <option value={2}>Pekerja</option>
              </select>
              <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div> */}

          {/* row 4.5.5 */}
          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Alamat Tempat Pendidikan / Kerja
              </label>
              <input
                className={`appearance-none ${
                  errorMsg.tempat_kerja_pendidikan !== null &&
                  "ring-2 ring-red-500"
                } block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3`}
                type="text"
                placeholder="Alamat Tempat Pendidikan / Kerja"
                value={pendaftar.tempat_kerja_pendidikan}
                onChange={(e) => {
                  if (e.target.value !== null) {
                    setForm("tempat_kerja_pendidikan", e.target.value);
                  }
                }}
              />
              {errorMsg.tempat_kerja_pendidikan !== null && (
                <p className="text-red text-xs italic">
                  {errorMsg.tempat_kerja_pendidikan}
                </p>
              )}
            </div>
          </div>

          {/* row 5.9  */}

          <div className="-mx-3 mb-3">
            <div className=" px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-state"
              >
                Barang Bawaan
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  value={pendaftar.status_barang}
                  onChange={(e) => {
                    if (e.target.value !== undefined) {
                      if (e.target.value == "true") {
                        setInputList([{ nama: "", qty: 1, error: "" }]);
                        setForm("status_barang", true);
                      } else {
                        setInputList([]);
                        setForm("status_barang", false);
                      }
                    }
                  }}
                >
                  <option value={false}>Tidak Ada</option>
                  <option value={true}>Ada</option>
                </select>
                <div className="right-0 top-1/3 absolute px-2 text-grey-darker">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* row 6.9999 */}

          {pendaftar.status_barang && (
            <div className="w-full mb-6 md:mb-5">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Daftar Barang Tambahan
              </label>
              {inputList.map((x, i) => {
                return (
                  <div>
                    <div key={i} className="flex flex-row mb-3 items-center">
                      {/* <div className="h-24 w-3/4 bg-red-800" />
                    <div className="h-24 w-1/4 bg-blue-800" /> */}
                      <div className="w-3/4">
                        <p>Nama Barang</p>
                        <input
                          onChange={(e) => {
                            handleInputChange(e.target.value, i, "nama");
                            // if (e.target.value !== undefined) {
                            //   setForm("nama_depan", e.target.value);
                            // }
                          }}
                          placeholder={`Barang ${parseInt(i) + 1}`}
                          className={`appearance-none ${
                            x.error !== "" && "ring-2 ring-red-500"
                          } w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4`}
                        ></input>
                      </div>
                      <div className="w-1/4 ml-3">
                        <p>Jumlah</p>
                        <input
                          // onChange={(e) => {
                          //   handleInputChange(e.target.value, i, "qty");
                          //   // if (e.target.value !== undefined) {
                          //   //   setForm("nama_depan", e.target.value);
                          //   // }
                          // }}
                          type="number"
                          value={inputList[i].qty}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              // setpendaftar({ ...pendaftar, nama: e.target.value });
                              if (parseInt(e.target.value) > 1) {
                                handleInputChange(
                                  parseInt(e.target.value),
                                  i,
                                  "qty"
                                );
                              } else {
                                handleInputChange(1, i, "qty");
                              }
                              console.log("change qty");
                            }
                          }}
                          placeholder={`Qty`}
                          className="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        ></input>
                      </div>

                      {inputList.length > 1 && (
                        <button
                          onClick={() => {
                            handleRemoveClick(i);
                          }}
                          className="inline-block p-3 mx-3 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {x.error !== "" && (
                      <p className="text-red text-xs italic">{x.error}</p>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => handleAddClick()}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-5"
              >
                Tambah
              </button>
            </div>
          )}

          {/* row 6  */}

          <div className="-mx-3 md:flex mb-3">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Pesan Untuk Pemilik Kost *Opsional
              </label>
              <textarea
                value={pendaftar.pesan}
                placeholder="Pesan"
                onChange={(e) => {
                  if (e.target.value !== undefined) {
                    setForm("pesan", e.target.value);
                  }
                }}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              ></textarea>
              {/* <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              type="text"
              placeholder="Alamat"
              value={pendaftar.alamat}
              onChange={(e) => {
                if (e.target.value !== null) {
                  setForm("alamat", e.target.value);
                }
              }}
            /> */}
            </div>
          </div>
          {/* row 7  */}
          {/* <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
            <p className="text-grey-dark text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div> */}
        </div>
        <button
          onClick={() => {
            submitData();
            // window.scroll({ top: 0, left: 0, behavior: "smooth" });
            // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-5 mx-8"
        >
          Submit Pendaftaran
        </button>
      </div>
    </div>
  );
};

export default MainForm;
