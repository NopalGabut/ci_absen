<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog">
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
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="first-name-column">Kode</label>
                                    <input type="text" id="txkode" class="form-control" placeholder="Kode" name="fname-column" maxlength="3">
                                </div>
                            </div>
                            <div class="col-md-8 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nama</label>
                                    <input type="text" id="txnama" class="form-control" placeholder="Nama" name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="city-column">Email</label>
                                    <input type="text" id="txemail" class="form-control" placeholder="Email" name="city-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="country-floating">Telp</label>
                                    <input type="text" id="txtelp" class="form-control" name="country-floating" placeholder="No.Telephone" maxlength="13">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="company-column">Region</label>
                                    <input type="text" id="txregion" class="form-control" name="company-column" placeholder="Region">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="email-id-column">Kota</label>
                                    <input type="email" id="txkota" class="form-control" name="email-id-column" placeholder="Kota">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="email-id-column">Alamat</label>
                                    <input type="email" id="txalamat" class="form-control" name="email-id-column" placeholder="Alamat">
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
            Form Kantor
        </h5>
        <button class="btn btn-primary" onclick="load_data()"><i class="fas fa-sync-alt"> </i> Refresh</button>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="fas fa-plus"> </i> Tambah data</button>
        <button class="btn btn-info" onclick="load_data()"><i class="fas fa-building"> </i> Set pusat</button>

    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table3">
                <thead>
                    <tr>
                        <th>Branch Id</th>
                        <th>Branch Client Id</th>
                        <th>Branch Code</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telp</th>
                        <th>Region</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Pusat</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($kantor as $ka) : ?>

                    <?php endforeach; ?>
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