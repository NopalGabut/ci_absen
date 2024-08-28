<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <button type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Informasi</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="alamat-tab" data-bs-toggle="tab" href="#alamat" role="tab" aria-controls="alamat" aria-selected="false">Alamat</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="asuransi-tab" data-bs-toggle="tab" href="#asuransi" role="tab" aria-controls="asuransi" aria-selected="false">Asuransi</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="kontak-tab" data-bs-toggle="tab" href="#kontak" role="tab" aria-controls="kontak" aria-selected="false">Kontak</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pendidikan-tab" data-bs-toggle="tab" href="#pendidikan" role="tab" aria-controls="pendidikan" aria-selected="false">Pendidikan</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Cabang</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_informasi" id="txcabang">
                                                                    <option value="" disabled selected>Pilih Cabang
                                                                    </option>
                                                                    <option value="Solo">Solo</option>
                                                                    <option value="Jakarta">Jakarta</option>
                                                                    <option value="Medan">Medan</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Bank</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_informasi" id="txbank">
                                                                    <option value="" disabled selected>Pilih Bank
                                                                    </option>
                                                                    <option value="BCA">BCA</option>
                                                                    <option value="BRI">BRI</option>
                                                                    <option value="Mandiri">Mandiri</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Nama</label>
                                                            <input id="txnama" type="text" class="form-control input_informasi" placeholder="Nama" name="lname-column" maxlength="10" onblur="valid_info(this.value, 1)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Nama Lengkap</label>
                                                            <input id="txnamalkp" type="text" class="form-control input_informasi" placeholder="Nama Lengkap" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kode</label>
                                                            <input id="txkode" type="text" class="form-control input_informasi angka" placeholder="Kode" name="lname-column" onblur="valid_info(this.value, 2)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Email</label>
                                                            <input id="txemail" type="text" class="form-control input_informasi" placeholder="Email" name="lname-column" onblur="valid_info(this.value, 3)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">KTP</label>
                                                            <input id="txktp" type="text" class="form-control input_informasi angka" placeholder="KTP" name="lname-column" onblur="valid_info(this.value, 4)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Jenis Kelamin</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_informasi" id="txgender">
                                                                    <option value="" disabled selected>Pilih Jenis
                                                                        Kelamin
                                                                    </option>
                                                                    <option value="Perempuan">Perempuan</option>
                                                                    <option value="Laki Laki">Laki Laki</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Golongan Darah</label>
                                                            <input id="txgolongan" type="text" class="form-control input_informasi" placeholder="Golongan Darah" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Nama Ibu</label>
                                                            <input id="txnamaibu" type="text" class="form-control input_informasi" placeholder="Nama Ibu" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Agama</label>
                                                            <input id="txagama" type="text" class="form-control input_informasi" placeholder="Agama" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kebangsaan</label>
                                                            <input id="txkebangsaan" type="text" class="form-control input_informasi" placeholder="Kebangsaan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">No Rekening</label>
                                                            <input id="txrekening" type="text" class="form-control input_informasi angka" placeholder="No Rekening" name="lname-column" onblur="valid_info(this.value, 5)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Tipe Gaji</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_informasi" id="txgaji">
                                                                    <option value="" disabled selected>Pilih Tipe Gaji
                                                                    </option>
                                                                    <option value="Harian">Harian</option>
                                                                    <option value="Minggunan">Minggunan</option>
                                                                    <option value="Bulanan">Bulanan</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">BPJS</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_informasi" id="txbpjs">
                                                                    <option value="" disabled selected>Pilih BPJS
                                                                    </option>
                                                                    <option value="BPJS Kesehatan">BPJS Kesehatan
                                                                    </option>
                                                                    <option value="BPJS Ketenagakerjaan">BPJS
                                                                        Ketenagakerjaan</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">No BPJS</label>
                                                            <input id="txnobpjs" type="text" class="form-control input_informasi angka" placeholder="No BPJS" name="lname-column" onblur="valid_info(this.value, 6)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">NPWP</label>
                                                            <input id="txnpwp" type="text" class="form-control input_informasi angka" placeholder="NPWP" name="lname-column" onblur="valid_info(this.value, 7)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8 col-12">
                                                        <div class="form-group">
                                                            <label for="formFile">Foto</label>
                                                            <input class="form-control input_informasi" type="file" id="txfoto">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tanggal Masuk</label>
                                                            <input id="tglmasuk" type="date" class="form-control input_informasi" placeholder="Tanggal Masuk" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tanggal Aktif</label>
                                                            <input id="tglaktif" type="date" class="form-control input_informasi" placeholder="Tanggal Aktif" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tanggal Keluar</label>
                                                            <input id="tglkeluar" type="date" class="form-control input_informasi" placeholder="Tanggal Keluar" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="tab-pane fade" id="alamat" role="tabpanel" aria-labelledby="alamat-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Jalan</label>
                                                            <input id="txjalan" type="text" class="form-control input_alamat" placeholder="Jalan" name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kelurahan</label>
                                                            <input id="txkelurahan" type="text" class="form-control input_alamat" placeholder="Kelurahan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kecamatan</label>
                                                            <input id="txkecamatan" type="text" class="form-control input_alamat" placeholder="Kecamatan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kota</label>
                                                            <input id="txkota" type="text" class="form-control input_alamat" placeholder="Kota" name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Provinsi</label>
                                                            <input id="txprovinsi" type="text" class="form-control input_alamat" placeholder="Provinsi" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Phone</label>
                                                            <input id="txphone" type="text" class="form-control input_alamat angka" placeholder="Phone" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1" id="btn-batal1" style="display: none;">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Batal</span>
                                                            </button>
                                                            <button type="button" class="btn btn-warning ms-1 btn-update" id="updtalmt">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="update_alamat()">Update</span>
                                                            </button>
                                                            <button type="button" class="btn btn-success ms-1" id="tmbhalmt">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="tambah_alamat()">Tambah</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_alamat">
                                                    <thead>
                                                        <tr>
                                                            <th>Jalan</th>
                                                            <th>Kelurahan</th>
                                                            <th>Kecamatan</th>
                                                            <th>Kota</th>
                                                            <th>Provinsi</th>
                                                            <th>Phone</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="asuransi" role="tabpanel" aria-labelledby="asuransi-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Asuransi</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_asuransi" id="txasuransi">
                                                                    <option value="" disabled selected>Pilih Asuransi
                                                                    </option>
                                                                    <option value="Asuransi Pendidikan">Asuransi
                                                                        Pendidikan</option>
                                                                    <option value="Asuransi Investasi">Asuransi
                                                                        Investasi</option>
                                                                    <option value="Asuransi Kendaraan">Asuransi
                                                                        Kendaraan</option>
                                                                    <option value="Asuransi Kecelakaan">Asuransi
                                                                        Kecelakaan</option>
                                                                    <option value="Asuransi Korporasi">Asuransi
                                                                        Korporasi</option>
                                                                    <option value="Asuransi Hari Tua">Asuransi Hari Tua
                                                                    </option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">No Asuransi</label>
                                                            <input id="txnoasuransi" type="text" class="form-control input_asuransi angka" placeholder="No Asuransi" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1" id="btn-batal2">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Batal</span>
                                                            </button>
                                                            <button type="button" class="btn btn-success ms-1" id="tmbhasuransi">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="tambah_asuransi()">Tambah</span>
                                                            </button>
                                                            <button type="button" class="btn btn-warning ms-1 btn-update" id="updtasrnsi">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="update_asuransi()">Update</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_asuransi">
                                                    <thead>
                                                        <tr>
                                                            <th>Asuransi Id</th>
                                                            <th>No Asuransi</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="kontak" role="tabpanel" aria-labelledby="kontak-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="first-name-column">Nama</label>
                                                            <input id="txnamak" type="text" class="form-control input_kontak" placeholder="Nama" name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Alamat</label>
                                                            <input id="txalamatk" type="text" class="form-control input_kontak" placeholder="Alamat" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="first-name-column">Profesi</label>
                                                            <input id="txprofesi" type="text" class="form-control input_kontak" placeholder="Profesi" name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Hubungan</label>
                                                            <input id="txhubungan" type="text" class="form-control input_kontak" placeholder="Hubungan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Phone</label>
                                                            <input id="txphonek" type="text" class="form-control input_kontak angka" placeholder="Phone" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1" id="btn-batal3">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Batal</span>
                                                            </button>
                                                            <button type="button" class="btn btn-success ms-1" id="tmbhkntk">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="tambah_kontak()">Tambah</span>
                                                            </button>
                                                            <button type="button" class="btn btn-warning ms-1 btn-update" id="updtkntk">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="update_kontak()">Update</span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_kontak">
                                                    <thead>
                                                        <tr>
                                                            <th>Nama</th>
                                                            <th>Alamat</th>
                                                            <th>Profesi</th>
                                                            <th>Hubungan</th>
                                                            <th>Phone</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pendidikan" role="tabpanel" aria-labelledby="pendidikan-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="first-name-column">Jenjang</label>
                                                            <input id="txjenjang" type="text" class="form-control input_pendidikan" placeholder="Jenjang" name="fname-column" maxlength="3">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Instansi</label>
                                                            <input id="txinstansi" type="text" class="form-control input_pendidikan" placeholder="Instansi" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Jurusan</label>
                                                            <input id="txjurusan" type="text" class="form-control input_pendidikan" placeholder="Jurusan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tahun Lulus</label>
                                                            <input id="txlulus" type="text" class="form-control input_pendidikan" placeholder="Tahun Lulus" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1" id="btn-batal4">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Batal</span>
                                                            </button>
                                                            <button type="button" class="btn btn-success ms-1" id="tmbhpen">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="tambah_pendidikan()">Tambah</span>
                                                            </button>
                                                            <button type="button" class="btn btn-warning ms-1 btn-update" id="updtpen">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block" onclick="update_pendidikan()">Update</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_pendidikan">
                                                    <thead>
                                                        <tr>
                                                            <th>Jenjang</th>
                                                            <th>Instansi</th>
                                                            <th>Jurusan</th>
                                                            <th>Tahun Lulus</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="btn-closed d-none d-sm-block ">Close</span>
                        </button>
                        <button type="button" class="btn btn-primary btn-submit ms-1" onclick="simpan_data()">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Submit</span>
                        </button>
                        <button type="button" class="btn btn-warning btn-editen ms-1" onclick="update_data()">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Update</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="importModal" tabindex="-1" aria-labelledby="importModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Import</h4>
                    <button type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form form-horizontal">
                        <div class="col-md-10 col-12">
                            <div class="form-group">
                                <label for="formFile">Data CSV</label>
                                <input class="form-control input_csv" type="file" id="tximport">
                            </div>
                        </div>
                        <div class="form-body">
                            <div class="row">
                                <div class="col-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-danger me-1 mb-1" data-bs-dismiss="modal">
                                        <i class="bx bx-check d-block d-sm-none"></i>
                                        <span class="d-none d-sm-block">Batal</span>
                                    </button>
                                    <button type="button" class="btn btn-primary me-1 mb-1">Template CSV</button>
                                    <button type="button" class="btn btn-warning me-1 mb-1" onclick="import_excel()" style="color: #fff;">Import CSV</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


</div>
<div class="card card-dta">
    <div class="card-header">
        <h5 class="card-title">
            Form Personal
        </h5>
        <button class="btn btn-success btn-add" type="button" onclick="openModal()"><i class="bi bi-plus-lg"> </i>Add</button>
        <button class="btn btn-primary" onclick="load_data()"><i class="bi bi-arrow-clockwise"> </i>Refresh</button>
        <button class="btn btn-warning" onclick="importModal()"><i class="bi bi-download"> </i>Import</button>
        <a class="btn btn-success" href="employee/exportExcel"><i class="fas fa-file-excel"></i> Export</a>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table3">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Profile</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
</section>
</div>
</div>
</section>
</div>
</section>
</div>
</div>


</body>

</html>