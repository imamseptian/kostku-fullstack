import React from "react";
import { formatRupiah } from "../../../functions/MyVar";
import { Link } from "react-router-dom";
import { APIUrl } from "../../../functions/MyVar";
const CardKelas = (props) => {
  return (
    <Link to={`/detail-kelas/${props.data.id}`}>
      <div className="cardkost bg-white shadow-xl rounded-lg overflow-hidden mb-3 mr-3 hover:opacity-50">
        <div
          className="bg-cover bg-center h-56 p-4"
          style={{
            backgroundImage: `url(${
              APIUrl + "/storage/images/kelas/" + props.data.foto
            })`,
            // "url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)",
          }}
        ></div>
        <div className="p-4">
          <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
            {props.data.nama}
          </p>
          <p className="text-xl text-gray-900">
            {formatRupiah(props.data.harga.toString(), "Rp. ")}
          </p>

          {/* <div className="bg-red-800 text-base py-1 px-3 w-min text-white mt-2 rounded-full">
          Penuh
        </div> */}
        </div>
        <div className="flex flex-col p-4 border-t border-gray-300 text-gray-700">
          <h2>Fasilitas</h2>
          {/* <h2>{JSON.stringify(props.data)}</h2> */}
          {/* <h2>{props.data.jml_kamar}</h2> */}
          {props.data.fasilitas.map((x, i) => {
            return (
              <div key={i} className="flex">
                <h4 className="mr-2">-</h4>
                <h4 className="text-justify text-sm">{x.nama}</h4>
              </div>
            );
          })}
        </div>
        {/* AYAYAYAYAYAY */}

        <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
          <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
            Deskripsi
          </div>

          <p className="mytruncate">{props.data.deskripsi}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardKelas;
