import React from "react";
import { Link } from "react-router-dom";
import { APIUrl } from "../../../functions/MyVar";

const CardKamar = (props) => {
  return (
    <Link to={`/daftar-kamar/${props.kelas.id}/${props.data.id}`}>
      <div className="cardkost bg-white shadow-xl rounded-lg overflow-hidden mb-3 mr-3 hover:opacity-50">
        <div
          className="bg-cover bg-center h-56 p-4"
          style={{
            backgroundImage: `url(${APIUrl}/storage/images/kelas/${props.kelas.foto})`,
          }}
        ></div>
        <div className="p-4">
          <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
            {props.data.nama}
          </p>
          {/* <p className="text-lg text-gray-900">Rp 500.000</p> */}

          <div className="flex justify-between bg-blue-400 text-base py-1 px-3  text-white mt-2 rounded-lg">
            {/* Kapasitas {props.data.current_penghuni} {props.kelas.kapasitas} */}
            <h1>Kuota</h1>
            <h1>
              {props.data.current_penghuni} / {props.kelas.kapasitas}
            </h1>
          </div>
        </div>

        {/* AYAYAYAYAYAY */}
      </div>
    </Link>
  );
};

export default CardKamar;
