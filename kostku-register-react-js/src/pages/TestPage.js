import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { APIUrl } from "../functions/MyVar";
import { myAxios } from "../functions/MyAxios";
import { Loader } from "./CommonComponents";
const TestPage = () => {
  const [dataKost, setdataKost] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [dataProvinsi, setdataProvinsi] = useState([]);
  const [dataKota, setdataKota] = useState([]);

  const [dataPage, setdataPage] = useState({
    last_page: 1,
    total: 0,
  });

  const [page, setpage] = useState(1);

  const [filter, setfilter] = useState({
    keyword: "",
    kota: 0,
    provinsi: 0,
    jenis: 0,
  });

  useEffect(() => {
    axios
      .get(`${APIUrl}/api/list_provinsi`)
      .then((res) => {
        setdataProvinsi(res.data.provinsi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (filter.provinsi !== 0) {
      axios
        .get(`${APIUrl}/api/list_kota/${filter.provinsi}`)
        .then((res) => {
          setdataKota(res.data.kota);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setfilter({ ...filter, kota: 0 });
      setdataKota([]);
    }
  }, [filter.provinsi]);

  useEffect(() => {
    setisLoading(true);
    // console.log("triggered useeffct");
    const source = axios.CancelToken.source();
    myAxios.postAxios(`${APIUrl}/api/list-kost`, filter, source.token, onPost);
    function onPost(status, data) {
      if (status === "success") {
        // console.log(data.data);
        setdataKost(data.data.data);
        setdataPage({
          ...filter,
          last_page: data.data.last_page,
          total: data.data.total,
        });
        setisLoading(false);
      } else if (status === "cancel") {
        console.log("caught cancel filter");
        // setisLoading(false)
      } else {
        console.log("error ambil api list penghuni");
        // console.log(filter);
        // setIsLoading(false);
        setisLoading(false);
      }
    }
    return () => {
      source.cancel("CANCEL");
    };
  }, [filter]);

  useEffect(() => {
    // console.log("triggered useeffct");
    const source = axios.CancelToken.source();
    if (page !== 1) {
      setisLoading(true);
      myAxios.postAxios(
        `${APIUrl}/api/list-kost?page=${page}`,
        filter,
        source.token,
        onPost
      );
      function onPost(status, data) {
        if (status === "success") {
          // console.log(data.data);
          setdataKost(data.data.data);
          setdataPage({
            ...filter,
            last_page: data.data.last_page,
            total: data.data.total,
          });
          setisLoading(false);
        } else if (status === "cancel") {
          console.log("caught cancel filter");
          // setisLoading(false)
        } else {
          console.log("error ambil api list penghuni");
          // console.log(filter);
          // setIsLoading(false);
          setisLoading(false);
        }
      }
    }

    return () => {
      source.cancel("CANCEL");
    };
  }, [page]);

  const jenisNama = (num) => {
    if (num === 1) {
      return "Kost Campuran";
    } else if (num === 2) {
      return "Kost Pria";
    } else {
      return "Kost Wanita";
    }
  };

  return (
    <div className="antialiased font-sans ">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Tabel Kost</h2>
          </div>
          <div className="flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value !== null) {
                      setfilter({ ...filter, jenis: e.target.value });
                    }
                  }}
                  className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value={0}>Semua</option>
                  <option value={1}>Campuran</option>
                  <option value={2}>Pria</option>
                  <option value={3}>Wanita</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {/* <div className="relative">
                <select className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div> */}

              <div className="relative">
                <select
                  value={filter.provinsi}
                  onChange={(e) => {
                    if (e.target.value !== null) {
                      setfilter({ ...filter, provinsi: e.target.value });
                    }
                  }}
                  className="h-full border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value={0}>Pilih Provinsi</option>
                  {dataProvinsi.map((x, i) => {
                    return <option value={x.id}>{x.name}</option>;
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  value={filter.kota}
                  onChange={(e) => {
                    if (e.target.value !== null) {
                      setfilter({ ...filter, kota: e.target.value });
                    }
                  }}
                  className="h-full border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value={0}>Pilih kota</option>
                  {dataKota.map((x, i) => {
                    return <option value={x.id}>{x.name}</option>;
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setfilter({ ...filter, keyword: e.target.value });
                }}
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal relative">
                {isLoading && (
                  <div className="loader absolute top-1/2 left-1/2"></div>
                )}

                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No
                    </th>
                    <th
                      onClick={() => {
                        alert("a");
                      }}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:opacity-50"
                    >
                      Nama Kost
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Jenis
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Provinsi
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kabupaten/Kota
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {dataKost.map((x, i) => {
                    return (
                      <tr key={i} className="bg-red-800">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {i + 1}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center ">
                            <div className="flex-shrink-0 w-28 h-auto">
                              <Link
                                to={`/infokost/${x.id}`}
                                className="text-gray-900 whitespace-no-wrap ml-3"
                              >
                                <img
                                  className="w-full h-full rounded-md"
                                  src={`${APIUrl}/storage/images/kost/${x.foto_kost}`}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <Link
                              to={`/infokost/${x.id}`}
                              className="text-gray-900 whitespace-no-wrap ml-3"
                            >
                              {x.nama}
                            </Link>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {jenisNama(parseInt(x.jenis))}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="capitalize text-gray-900 whitespace-no-wrap">
                            {x.nama_provinsi}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="capitalize text-gray-900 whitespace-no-wrap">
                            {x.nama_kota}
                          </p>
                        </td>
                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Activo</span>
                          </span>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Total Data : {dataKost.length} Data
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4">
                    1
                  </button>
                  <button className="text-sm bg-gray-100 text-gray-800 font-semibold py-2 px-4">
                    2
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4">
                    3
                  </button>
                  <button
                    // disabled={true}
                    onClick={() => {
                      if (page < dataPage.last_page) {
                        setpage(page + 1);
                      }
                    }}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {ayaya.map((x, i) => {
        return (
          // <div className="h-24 w-1/4 bg-indigo-400 mx-auto"></div>
          <div className="shadow-md flex mb-10 p-6 items-center bg-white max-w-sm mx-auto rounded-md">
            <div className="mr-3">
              <img height={50} width={50} src={Logo} alt="kontoru" />
            </div>
            <div className>
              <div className="text-xl font-medium ml-0">Notification</div>
              <p className="text-gray-500">You got new notifications</p>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default TestPage;
