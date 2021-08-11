import {
  faPhone,
  faUsers,
  faConciergeBell,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ErrorSVG from "../assets/svg/error404.svg";
import { ErrorSVG } from "../../assets/svg";
import { CardKamar } from "./components";
import { Loader } from "../CommonComponents";
import { formatRupiah, APIUrl } from "../../functions/MyVar";
import { useHistory } from "react-router-dom";

const DetailKelas = () => {
  const { id_kelas } = useParams();
  let history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [kost, setkost] = useState("ayaya");
  const [kelas, setkelas] = useState(null);
  const [kamar, setkamar] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    axios
      .get(`${APIUrl}/api/infokamar/${id_kelas}`)
      .then((res) => {
        if (res.data.success) {
          setkelas(res.data.kamar);
          setkamar(res.data.kamar_tersedia);
          setisLoading(false);
        }
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }, [id_kelas]);

  return (
    <div
      className={`flex flex-col ${
        isLoading && "min-h-screen"
      } shadow-md lg:w-4/5 md:w-3/4 sm:w-full mx-auto bg-white rounded-md py-3`}
    >
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Loader />
        </div>
      ) : kelas === null ? (
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center">
            <ErrorSVG width={200} height={200} />
            <h1 className="text-2xl">Maaf Data Kelas Tidak Ditemukan</h1>
          </div>
        </div>
      ) : (
        <div>
          {/* <div className="flex-shrink-0 mx-auto rounded-lg"> */}
          <div className="flex justify-center">
            <div className="w-96 h-auto m-3">
              <img
                className="rounded-lg border border-gray-100 shadow-sm"
                src={APIUrl + "/storage/images/kelas/" + kelas.foto}
                alt="user image"
              />
              {/* <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div> */}
            </div>
          </div>

          {/* <img
            className="object-contain h-64 w-full rounded-lg"
            src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt=""
          /> */}
          {/* </div> */}
          <div className="py-4 px-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {kelas.nama}
            </h1>
            <div className="flex items-center mt-4 text-gray-700">
              <div className="flex h-6 w-6 items-center justify-center">
                <FontAwesomeIcon icon={faTag} rotation={90} />
              </div>

              <h1 className="px-2 text-sm">
                {formatRupiah(kelas.harga.toString(), "Rp. ")}
              </h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700">
              <div className="flex h-6 w-6 items-center justify-center">
                <FontAwesomeIcon icon={faUsers} />
              </div>

              <h1 className="px-2 text-sm">
                {kelas.kapasitas} Penghuni Kapasitas
                {/* {JSON.stringify(kelas)} Penghuni Kapasitas */}
              </h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700">
              <div className="flex h-6 w-6 items-center justify-center">
                <FontAwesomeIcon icon={faConciergeBell} />
              </div>

              <h1 className="px-2 text-sm">Fasilitas</h1>
            </div>
            {kelas.fasilitas.map((x, i) => {
              return (
                <div className="flex items-center mt-4 text-gray-700">
                  <h1 className="px-2 text-sm">-</h1>
                  <h1 className="px-2 text-sm">{x.nama}</h1>
                </div>
              );
            })}

            <h1 className="text-2xl font-semibold text-gray-800 mt-4">
              Deskripsi
            </h1>
            {/* <p className="py-2 text-sm text-gray-700">{kelas.deskripsi}</p> */}
            <p className="py-2 text-sm text-gray-700">
              {/* {JSON.stringify(kamar)} */}
              {kelas.deskripsi}
            </p>
          </div>
          <div className="flex justify-center my-3">
            <h1 className="text-2xl font-semibold text-gray-800">
              {kamar.length < 1
                ? "Maaf Tidak Ada Kamar Tersedia"
                : "Daftar Kamar Tersedia"}
            </h1>
          </div>

          <div className="flex flex-wrap justify-center px-6">
            {kamar.map((x, i) => {
              return <CardKamar key={i} data={x} kelas={kelas} />;
            })}
          </div>
        </div>
      )}
      {/* <div className="flex flex-col items-center">
          <ErrorSVG width={200} height={200} />
          <h1 className="text-2xl">Maaf Data Kost Tidak Ditemukan</h1>
        </div> */}
    </div>
  );
};

export default DetailKelas;
