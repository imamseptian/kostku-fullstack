// const APIUrl = "https://dry-forest-53707.herokuapp.com";
const APIUrl = "https://apikostku.xyz";

const formatRupiah = (angka, prefix) => {
  let number_string = angka.replace(/[^,\d]/g, "").toString(),
    remove_zero = parseInt(number_string),
    string_zero = remove_zero.toString(),
    split = string_zero.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

export { formatRupiah, APIUrl };
