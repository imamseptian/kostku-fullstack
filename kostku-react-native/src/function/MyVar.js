import {Dimensions} from 'react-native';

// const APIUrl = 'https://dry-forest-53707.herokuapp.com';
const APIUrl = 'https://apikostku.xyz';

// const myColor = {
//   colorTheme: '#9cdfde',
//   colorsubTheme: '#ffaa91',
//   // Button primary
//   color1: '#fcc78e',
//   // Button danger
//   color2: '#ff7477',
//   fab: '#88dbd8',
// };
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const defaultAsset = {
  kelas_kamar:
    'https://www.harapanrakyat.com/wp-content/uploads/2020/04/Desain-Kamar-Tidur-Nyaman-Hangat-696x464.jpg',
  foto_profil: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  yupi: `https://i.pinimg.com/564x/41/73/68/4173687c3ced72dc678b9608a3f43285.jpg`,
};

const myColor = {
  // colorTheme: '#8340ee',
  colorTheme: '#00B6FA',
  colorsubTheme: '#ffaa91',
  // Button primary
  color1: '#fcc78e',
  // Button danger
  color2: '#ff7477',
  fab: '#88dbd8',
  darkText: '#636e72',
  blackText: '#2d3436',
  tagSelect: '#bdc3c7',
  alert: '#e74c3c',
  subtitle: '#e17055',
  success: '#fff200',
  myWhite: '#fbfbfb',
  whiteBack: '#f0f0f0',
  titleHome: '#0b468f',
  myblue: '#8340ee',
  splashsvg: '#A5AEBF',
  blue2: '#672EFF',
  applynow: '#fea000',
  addfacility: '#c0ca33',
  etcbuble: '#55efc4',
  bgfb: '#f5f5f5',
  fbtx: '#161616',
  fbtx1: '#a5a5a5',
  grayprofile: '#F2F5FA',
  graytextprof: '#8E9EA8',
  grayGoogle: '#696968',
  divider: '#bfc6cf',
  cardWhite: '#ffffff',
  bgWhite: '#f6f6f6',
};

const formatRupiah = (angka, prefix) => {
  let number_string = angka.replace(/[^,\d]/g, '').toString(),
    remove_zero = parseInt(number_string),
    string_zero = remove_zero.toString(),
    split = string_zero.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
};

const rupiahToInt = (angka) => {
  let number_string = angka.replace(/[^,\d]/g, '').toString();
  let nilai = parseInt(number_string);
  return nilai;
};

const kataPertama = (words) => {
  if (words === null) {
    return;
  }
  let firstWord = words.replace(/ .*/, '');
  return firstWord;
};

const startingYear = 2020;

const dataBulan = [
  {id: 1, nama: 'Januari', sort: 'Jan'},
  {id: 2, nama: 'Februari', sort: 'Feb'},
  {id: 3, nama: 'Maret', sort: 'Mar'},
  {id: 4, nama: 'April', sort: 'Apr'},
  {id: 5, nama: 'Mei', sort: 'Mei'},
  {id: 6, nama: 'Juni', sort: 'Juni'},
  {id: 7, nama: 'Juli', sort: 'Juli'},
  {id: 8, nama: 'Agustus', sort: 'Agus'},
  {id: 9, nama: 'September', sort: 'Sep'},
  {id: 10, nama: 'Oktober', sort: 'Okt'},
  {id: 11, nama: 'November', sort: 'Nov'},
  {id: 12, nama: 'Desember', sort: 'Des'},
];

const dataTahun = () => {
  let year = new Date().getFullYear(); //To get the Current Year
  let myTahun = [];
  let tahun = startingYear;
  while (tahun <= year) {
    let oneyear = {id: tahun};
    myTahun.push(oneyear);
    tahun = tahun + 1;
  }

  return myTahun;
};

// const colorTheme = '#ffaa91';

// // Button primary
// const color1 = '#fcc78e';
// // Button danger
// const color2 = '#ff7477';

export {
  APIUrl,
  myColor,
  formatRupiah,
  screenWidth,
  screenHeight,
  startingYear,
  dataBulan,
  dataTahun,
  defaultAsset,
  rupiahToInt,
  kataPertama,
};
