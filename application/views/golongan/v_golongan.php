<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-s">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <button type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <form action="#">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="first-name-column">Kode</label>
                                    <input type="text" id="txcode" class="form-control" placeholder="" name="fname-column">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nama</label>
                                    <input type="text" id="txnama" class="form-control" placeholder="" name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column ">Nominal</label>
                                    <input type="text" id="txnominal" class="form-control inputnumeric angka des" onkeyup="divide()" placeholder="" name="levelgroupAmount">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Total Hari dibayar</label>
                                    <input type="text" id="txtotal" class="form-control inputnumeric" onkeyup="divide()" placeholder="" name="levelgroupDivide">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal/Hari</label>
                                    <input type="text" id="txhari" class="form-control inputnumeric" placeholder="" name="levelgroupNominal" disabled>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md col-12">
                                    <div class="form-group">
                                        <label for="setengah">Setengah Hari</label>
                                        <select id="txsetengah" class="form-control select2" name="city-column" onchange="cekIsHalf()" aria-placeholder="PILIH OPSI">
                                            <option value="">-PILIH OPSI-</option>
                                            <option value="0">Digaji</option>
                                            <option value="1">Tidak Digaji</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md col-12">
                                    <div class="form-group">
                                        <label for="txpersen">Persen/Amount</label>
                                        <select id="txpersen" class="form-control select2" name="city-column" aria-placeholder="PILIH OPSI">
                                            <option value="" disabled selected class="placeholder">-PILIH OPSI-</option>
                                            <option value="0">Persen</option>
                                            <option value="1">Amount</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-5 col-12">
                                    <div class="form-group">
                                        <label for="txpokok" id="labelPokok">Pokok/Hari</label>
                                        <input type="number" id="txpokok" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                    <i class="bx bx-x d-block d-sm-none"></i>
                                    <span class="btn-closed d-none d-sm-block ">Close</span>
                                </button>
                                <button type="button" onclick="simpan_data()" class="btn btn-primary btn-submit ms-1">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block">Submit</span>
                                </button>
                                <button type="button" onclick="update_data()" class="btn btn-warning btn-editen ms-1">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block">Update</span>
                                </button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="card card-dta">
    <div class="card-header">
        <h5 class="card-title">
            Form Golongan
        </h5>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="fas fa-plus"> </i> Tambah Data</button>
        <button class="btn btn-primary" onclick="load_data()"><i class="fas fa-sync-alt"> </i> Refresh</button>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table3">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Nominal</th>
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