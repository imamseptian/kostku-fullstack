<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('signup', 'AuthController@signup');

    // Route::get('/home', 'HomeController@index')->name('home');
});

Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
    Route::get('profil', 'AuthController@profile');
    Route::put('editprofil', 'AuthController@editProfil');
    Route::put('editkost', 'KostController@editKost');

    // Kelas
    Route::post('/classes', 'ClassKamarController@get'); //get daftar kelas kamar
    Route::post('/addfasilitas', 'FasilitasController@addKamarFasilitas'); //Add Fasilitas
    Route::put('/fasilitas/{id}', 'FasilitasController@editFasilitas'); //Edit Fasilitas
    Route::delete('/hapuskamarfasilitas/{id}', 'FasilitasController@hapusKamarFasilitas'); //Hapus fasilitas


    Route::get('/class/{id}', 'ClassKamarController@getById');
    // Route::post('/class', 'ClassKamarController@post');
    Route::put('/class/{id}', 'ClassKamarController@put');
    Route::delete('/class/{id}', 'ClassKamarController@delete');

    Route::get('/kamars', 'KamarController@get');

    Route::post('/daftarkamar', 'KamarController@daftarKamar'); // Get Daftar Kamar

    Route::get('/searchkamar/{id}/{search}', 'KamarController@searchKamar');
    Route::get('/kamar/{id}', 'KamarController@getById');
    Route::post('/kamar', 'KamarController@post');
    Route::put('/kamar/{id}', 'KamarController@put');
    Route::delete('/kamar/{id}', 'KamarController@delete');


    Route::get('/kost/{id}', 'KostController@getById');
    Route::get('/firsttime', 'KostController@checkFirstTime'); //Check First Time Login
    Route::post('/kost', 'KostController@post');
    Route::put('/kost/{id}', 'KostController@put');
    Route::delete('/kamar/{id}', 'KostController@delete');

    Route::post('/cobapost', 'PendaftarController@cobapost');
    Route::post('/get_all_pendaftar', 'PendaftarController@getPendaftar');
    Route::put('/pendaftar/{id}', 'PendaftarController@editPendaftar');

    Route::post('/daftarpenghuni', 'PenghuniController@getAll');
    // Route::post('/tambah_penghuni', 'PenghuniController@addPenghuni');

    Route::get('/homescreen/{id}', 'KostController@homeScreen'); //Fungsi Fetch Data HomeScreen

    // Tagihan seorang penghunii
    // Route::get('/gettagihan/{id}', 'TagihanController@getTagihan');
    // Route::put('/pendaftar/{id}','PendaftarController@editPendaftar');

    Route::post('/bayartagihan', 'TransaksiController@bayartagihan');

    //Daftar Peghuni , untuk search
    // Route::post('/tagihanpenghuni', 'TransaksiController@getTagihanPenghuni');

    // Cari penghuni dan tagihan by id
    Route::get('/gettagihanbyid/{id}', 'TransaksiController@getTagihanById');

    Route::get('/riwayatpembayaran/{id}', 'TagihanController@riwayatPembayaranSewa');

    // Pengeluaran

    Route::get('/getpengeluaran/{id}', 'TransaksiController@allPengeluaran');
    Route::post('/pengeluaran', 'TransaksiController@addPengeluaran');
    Route::post('/filterpengeluaran', 'TransaksiController@filterPengeluaran');
    Route::post('/filterpemasukan', 'TransaksiController@filterPemasukan');
    Route::get('/mypdf/{bulan}/{tahun}', 'PDFController@pdfku');
    Route::get('/namapdf/{bulan}/{tahun}', 'PDFController@getNamaPDF');

    #CHART
    Route::get('/chart_keuangan/{id}', 'StatistikController@ChartKeuangan');
    Route::get('/statistik_pie/{id}', 'StatistikController@StatistikPie'); //CHART PENGHUNI DAN DAERAH
    Route::post('/chart_pendapatan', 'StatistikController@ChartPendapatan'); // CHART PENDAPATAN
    Route::get('/get_transaksi/{id}/{jenis}/{month}/{year}', 'TransaksiController@getTransaksi'); //get penghuni on linechart
    Route::post('/filter_penghuni', 'PenghuniController@FilterPenghuni'); //modal di chart daerah
});

Route::get('/getfasilitas/{id}', 'FasilitasController@getFasilitas'); //get fasilitas kamar

Route::post('/list-kost', 'KostController@filterKost');

Route::post('/createcustombarang', 'BarangController@customBarangPenghuni');
Route::post('/caribarang', 'BarangController@cariBarang');
Route::get('/allbarang', 'BarangController@allBarang');



Route::post('/testtanggal', 'KamarController@ayaya');
Route::post('/tambah_penghuni', 'PenghuniController@addPenghuni');
Route::post('/edit_penghuni', 'PenghuniController@editPenghuni');


Route::post('/class', 'ClassKamarController@post');
// Route::post('/classes', 'ClassKamarController@get');

Route::post('catattransaksi', 'TransaksiController@catatTransaksiBayar');
Route::post('make_custom_tagihan', 'TagihanController@createCustomTagihan');
Route::get('/gettagihan/{id}', 'TagihanController@getTagihan');

Route::post('daftar_bawaan', 'PendaftarController@bawaBarang');
Route::post('barang_pendaftar', 'BarangController@barangPendaftar');
// Route::post('barang_penghuni', 'BarangController@barangPenghuni');
Route::get('barang_penghuni/{id}', 'BarangController@barangPenghuni');
Route::post('add_barang_penghuni', 'BarangController@addBarangPenghuni');
Route::post('edit_barang_penghuni', 'BarangController@editBarangPenghuni');
Route::post('delete_barang_penghuni', 'BarangController@deleteBarangPenghuni');
Route::get('all_barang', 'PendaftarController@allBarang');
Route::get('checkstatus', 'AuthController@checkStatus');
Route::get('kamargetall', 'ClassKamarController@getAllKelas');

Route::post('/cobasend', 'PendaftarController@cobasend');
Route::post('/daftarkost', 'PendaftarController@daftar');
Route::get('/cek_kost/{id}', 'KostController@checkExist');

Route::get('/getkost/{id}', 'KostController@getKelasKost');
Route::get('/getkamar/{id}', 'KostController@getKamarKost');
Route::get('/checkkamar/{id}', 'KostController@cobaKamar');
Route::get('/infokost/{id}', 'KostController@getKost'); // GET KOST FOR WEB DAFTAR
Route::get('/infokamar/{id}', 'ClassKamarController@infoKamar');

Route::get('/allkamarku', 'KostController@allKamarkost');
Route::get('/alltagihan', 'TagihanController@getAll');
Route::get('/tagihanpenghuni', 'TagihanController@tagihanPenghuni');

// Route::post('/class','ClassKamarController@post');

Route::post('/allkamars', 'KamarController@allKamars');
Route::get('/mycarbon', 'TransaksiController@mycarbon');
Route::get('/testtransaksi', 'TransaksiController@createTransaksi');
Route::get('/alltransaksi', 'TransaksiController@allTransaksi');
Route::get('/lasttagihan/{id}', 'TransaksiController@lastTagihan');
Route::post('/customtransaksi', 'TransaksiController@customTransaksi');
Route::get('/geteverydaytransaction', 'TransaksiController@geteverydaytransaction');
Route::post('/kirimchat', 'TransaksiController@cobaWa');


// chart penghuni


Route::post('/create_transaksi', 'TransaksiController@createCustomTransaksi');
Route::get('/hapus_nanti', 'TransaksiController@hapusNanti');

Route::post('/modal_keuangan', 'StatistikController@modalKeuangan');
Route::get('/ayaya', 'PenghuniController@ListPenghuni');

Route::get('/send-email', 'StatistikController@cobaEmail');
Route::post('/email_penghuni', 'PenghuniController@kirimEmail');
// Route::post('/wa_penghuni', 'PenghuniController@notifikasiWA');

Route::post('/store_gambar', 'BarangController@storeGambar');
Route::post('/send_wa_notif', 'BarangController@testNotifWa');
Route::post('/notif_tagihan', 'TagihanController@notifikasiTagihan');
Route::get('/ceknotiftagihan', 'TagihanController@cekTagihan');
Route::post('/tagihanpenghuni', 'TransaksiController@getTagihanPenghuni');
Route::get('/kamar_pesanan/{id}', 'PendaftarController@kamarPesanan');
Route::get('/list_provinsi', 'ProvinsiController@getListProvinsi');
Route::get('/list_kota/{id}', 'KotaController@getListKota');
Route::post('/hapus_kelas', 'ClassKamarController@hapusKelas');
Route::post('/hapus_kamar', 'KamarController@hapusKamar');
Route::post('/konfirmasi_hapus', 'PenghuniController@konfirmasiHapus');
Route::post('/hapus_penghuni', 'PenghuniController@hapusPenghuni');
Route::post('/list_kelas', 'ClassKamarController@listKelas');
Route::post('/list_kamar', 'KamarController@listKamar');
Route::post('/pindah_kamar', 'KamarController@pindahKamar');
Route::get('/global_tagihan', 'TagihanController@createGlobalTagihan');
