var arrAlamat = [];
var arrAsuransi = [];
var arrKontak = [];
var arrPendidikan = [];
var alamatId = null;
var asuransiId = null;
var kontakId = null;
var pendidikanId = null;

function tambah_alamat() {
  if (alamatId == null) {
    let empladdressJalan = $("#txjalan").val();
    let empladdressKelurahan = $("#txkelurahan").val();
    let empladdressKecamatan = $("#txkecamatan").val();
    let empladdressKota = $("#txkota").val();
    let empladdressProvinsi = $("#txprovinsi").val();
    let empladdressPhone = $("#txphone").val();

    if (
      empladdressJalan === "" ||
      empladdressKelurahan === "" ||
      empladdressKecamatan === "" ||
      empladdressKota === "" ||
      empladdressProvinsi === "" ||
      empladdressPhone === ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      arrAlamat.push({
        empladdressEmployeeId: 0,
        empladdressJalan: $("#txjalan").val(),
        empladdressKelurahan: $("#txkelurahan").val(),
        empladdressKecamatan: $("#txkecamatan").val(),
        empladdressKota: $("#txkota").val(),
        empladdressProvinsi: $("#txprovinsi").val(),
        empladdressPhone: $("#txphone").val(),
      });
      clearForm();
    }
  }
  tampil_alamat();
}

function tampil_alamat() {
  $("#table_alamat").DataTable().clear().destroy();
  $("#table_alamat > tbody").html("");
  $.each(arrAlamat, function (idx, val) {
    html = "<tr>";
    html += "<td>" + val["empladdressJalan"] + "</td>";
    html += "<td>" + val["empladdressKelurahan"] + "</td>";
    html += "<td>" + val["empladdressKecamatan"] + "</td>";
    html += "<td>" + val["empladdressKota"] + "</td>";
    html += "<td>" + val["empladdressProvinsi"] + "</td>";
    html += "<td>" + val["empladdressPhone"] + "</td>";
    html +=
      '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_alamat(' +
      idx +
      ')">Edit</button></td>';
    html +=
      '<td><button class="btn btn-danger btn-sm " onclick="hapus_alamat(' +
      idx +
      ')">Hapus</button></td>';
    html += "</tr>";
    $("#table_alamat > tbody").append(html);
    $(".input_alamat").val("");
  });
  $("#table_alamat").DataTable({
    responsive: true,
    processing: true,
    pagingType: "first_last_numbers",
    // order: [[0, 'asc']],
    dom:
      "<'row'<'col-3'l><'col-9'f>>" +
      "<'row dt-row'<'col-sm-12'tr>>" +
      "<'row'<'col-4'i><'col-8'p>>",
    language: {
      info: "Page _PAGE_ of _PAGES_",
      lengthMenu: "MENU",
      search: "",
      searchPlaceholder: "Search..",
    },
  });
  console.log(arrAlamat);
}

function edit_alamat(idx) {
  var alamat = arrAlamat[idx];
  alamatId = idx;
  $("#txjalan").val(alamat.empladdressJalan);
  $("#txkelurahan").val(alamat.empladdressKelurahan);
  $("#txkecamatan").val(alamat.empladdressKecamatan);
  $("#txkota").val(alamat.empladdressKota);
  $("#txprovinsi").val(alamat.empladdressProvinsi);
  $("#txphone").val(alamat.empladdressPhone);
  $("#tmbhalmt").hide();
  $("#updtalmt").show();
}

function update_alamat() {
  var alamat = arrAlamat[alamatId];
  let empladdressJalan = $("#txjalan").val();
  let empladdressKelurahan = $("#txkelurahan").val();
  let empladdressKecamatan = $("#txkecamatan").val();
  let empladdressKota = $("#txkota").val();
  let empladdressProvinsi = $("#txprovinsi").val();
  let empladdressPhone = $("#txphone").val();

  if (
    empladdressJalan === "" ||
    empladdressKelurahan === "" ||
    empladdressKecamatan === "" ||
    empladdressKota === "" ||
    empladdressProvinsi === "" ||
    empladdressPhone === ""
  ) {
    Swal.fire({
      title: "Error!",
      text: "Please fill in all fields.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    if (alamat) {
      alamat.empladdressJalan = empladdressJalan;
      alamat.empladdressKelurahan = empladdressKelurahan;
      alamat.empladdressKecamatan = empladdressKecamatan;
      alamat.empladdressKota = empladdressKota;
      alamat.empladdressProvinsi = empladdressProvinsi;
      alamat.empladdressPhone = empladdressPhone;
      Swal.fire({
        title: "Success!",
        text: "Address updated success",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(arrAlamat);
      tambah_alamat();
      alamatId = null;
      $("#tmbhalmt").show();
      $("#updtalmt").hide();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Address data not found",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

function hapus_alamat(id) {
  alamatId = id;
  arrAlamat.splice(id, 1);
  tambah_alamat();
  alamatId = null;
}

function tambah_asuransi() {
  if (asuransiId == null) {
    let emplinsuranceBpjsId = $("#txasuransi").val();
    let emplinsuranceNo = $("#txnoasuransi").val();

    if (emplinsuranceBpjsId === "" || emplinsuranceNo === "") {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      arrAsuransi.push({
        emplinsuranceEmployeeId: 0,
        emplinsuranceBpjsId: $("#txasuransi").val(),
        emplinsuranceNo: $("#txnoasuransi").val(),
      });
      clearForm();
    }
  }
  tampil_asuransi();
}

function tampil_asuransi() {
  $("#table_asuransi").DataTable().clear().destroy();
  $("#table_asuransi > tbody").html("");
  $.each(arrAsuransi, function (idx, val) {
    html = "<tr>";
    html += "<td>" + val["emplinsuranceBpjsId"] + "</td>";
    html += "<td>" + val["emplinsuranceNo"] + "</td>";
    html +=
      '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_asuransi(' +
      idx +
      ')">Edit</button></td>';
    html +=
      '<td><button class="btn btn-danger btn-sm " onclick="hapus_asuransi(' +
      idx +
      ')">Hapus</button></td>';
    html += "</tr>";
    $("#table_asuransi > tbody").append(html);
    $(".input_asuransi").val("");
  });
  $("#table_asuransi").DataTable({
    responsive: true,
    processing: true,
    pagingType: "first_last_numbers",
    // order: [[0, 'asc']],
    dom:
      "<'row'<'col-3'l><'col-9'f>>" +
      "<'row dt-row'<'col-sm-12'tr>>" +
      "<'row'<'col-4'i><'col-8'p>>",
    language: {
      info: "Page _PAGE_ of _PAGES_",
      lengthMenu: "MENU",
      search: "",
      searchPlaceholder: "Search..",
    },
  });
  console.log(arrAsuransi);
}

function edit_asuransi(idx) {
  var asuransi = arrAsuransi[idx];
  asuransiId = idx;
  $("#txasuransi").val(asuransi.emplinsuranceBpjsId);
  $("#txnoasuransi").val(asuransi.emplinsuranceNo);
  $("#tmbhasuransi").hide();
  $("#updtasrnsi").show();
}

function update_asuransi() {
  var asuransi = arrAsuransi[asuransiId];
  let emplinsuranceBpjsId = $("#txasuransi").val();
  let emplinsuranceNo = $("#txnoasuransi").val();

  if (emplinsuranceBpjsId === "" || emplinsuranceNo === "") {
    Swal.fire({
      title: "Error!",
      text: "Please fill in all fields.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    if (asuransi) {
      asuransi.emplinsuranceBpjsId = emplinsuranceBpjsId;
      asuransi.emplinsuranceNo = emplinsuranceNo;
      Swal.fire({
        title: "Success!",
        text: "Address updated success",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(arrAsuransi);
      tambah_asuransi();
      asuransiId = null;
      $("#tmbhasuransi").show();
      $("#updtasrnsi").hide();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Address data not found",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

function hapus_asuransi(id) {
  asuransiId = id;
  arrAsuransi.splice(id, 1);
  tambah_asuransi();
  asuransiId = null;
}

function tambah_kontak() {
  if (kontakId == null) {
    let emplcontactName = $("#txnamak").val();
    let emplcontactAddress = $("#txalamatk").val();
    let emplcontactProfesion = $("#txprofesi").val();
    let emplcontactHubungan = $("#txhubungan").val();
    let emplcontactPhone = $("#txphonek").val();

    if (
      emplcontactName == "" ||
      emplcontactAddress == "" ||
      emplcontactProfesion == "" ||
      emplcontactHubungan == "" ||
      emplcontactPhone == ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in my fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      arrKontak.push({
        emplcontactEmployeeId: 0,
        emplcontactName: $("#txnamak").val(),
        emplcontactAddress: $("#txalamatk").val(),
        emplcontactProfesion: $("#txprofesi").val(),
        emplcontactHubungan: $("#txhubungan").val(),
        emplcontactPhone: $("#txphonek").val(),
      });
      clearForm();
    }
  }
  tampil_kontak();
}

function tampil_kontak() {
  $("#table_kontak").DataTable().clear().destroy();
  $("#table_kontak > tbody").html("");
  $.each(arrKontak, function (idx, val) {
    html = "<tr>";
    html += "<td>" + val["emplcontactName"] + "</td>";
    html += "<td>" + val["emplcontactAddress"] + "</td>";
    html += "<td>" + val["emplcontactProfesion"] + "</td>";
    html += "<td>" + val["emplcontactHubungan"] + "</td>";
    html += "<td>" + val["emplcontactPhone"] + "</td>";
    html +=
      '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_kontak(' +
      idx +
      ')">Edit</button></td>';
    html +=
      '<td><button class="btn btn-danger btn-sm " onclick="hapus_kontak(' +
      idx +
      ')">Hapus</button></td>';
    html += "</tr>";
    $("#table_kontak > tbody").append(html);
    $(".input_kontak").val("");
  });
  $("#table_kontak").DataTable({
    responsive: true,
    processing: true,
    pagingType: "first_last_numbers",
    // order: [[0, 'asc']],
    dom:
      "<'row'<'col-3'l><'col-9'f>>" +
      "<'row dt-row'<'col-sm-12'tr>>" +
      "<'row'<'col-4'i><'col-8'p>>",
    language: {
      info: "Page PAGE of PAGES",
      lengthMenu: "MENU",
      search: "",
      searchPlaceholder: "Search..",
    },
  });
}

function edit_kontak(idx) {
  var kontak = arrKontak[idx];
  kontakId = idx;
  $("#txnamak").val(kontak.emplcontactName);
  $("#txalamatk").val(kontak.emplcontactAddress);
  $("#txprofesi").val(kontak.emplcontactProfesion);
  $("#txhubungan").val(kontak.emplcontactHubungan);
  $("#txphonek").val(kontak.emplcontactPhone);
  $("#tmbhkntk").hide();
  $("#updtkntk").show();
}

function update_kontak() {
  var kontak = arrKontak[kontakId];
  let emplcontactName = $("#txnamak").val();
  let emplcontactAddress = $("#txalamatk").val();
  let emplcontactProfesion = $("#txprofesi").val();
  let emplcontactHubungan = $("#txhubungan").val();
  let emplcontactPhone = $("#txphonek").val();

  if (
    emplcontactName == "" ||
    emplcontactAddress == "" ||
    emplcontactProfesion == "" ||
    emplcontactHubungan == "" ||
    emplcontactPhone == ""
  ) {
    Swal.fire({
      title: "Error!",
      text: "Please fill in my fields.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    if (kontak) {
      kontak.emplcontactName = emplcontactName;
      kontak.emplcontactAddress = emplcontactAddress;
      kontak.emplcontactProfesion = emplcontactProfesion;
      kontak.emplcontactHubungan = emplcontactHubungan;
      kontak.emplcontactPhone = emplcontactPhone;
      Swal.fire({
        title: "Success!",
        text: "Kontak updated success",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(arrKontak);
      tambah_kontak();
      kontakId = null;
      $("#tmbhkntk").show();
      $("#updtkntk").hide();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kontak data not found",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

function hapus_kontak(id) {
  kontakId = id;
  arrKontak.splice(id, 1);
  tambah_kontak();
  kontakId = null;
}

function tambah_pendidikan() {
  if (pendidikanId == null) {
    let empleduJenjang = $("#txjenjang").val();
    let empleduInstansi = $("#txinstansi").val();
    let empleduJurusan = $("#txjurusan").val();
    let empleduTahunlulus = $("#txlulus").val();

    if (
      empleduJenjang == "" ||
      empleduInstansi == "" ||
      empleduJurusan == "" ||
      empleduTahunlulus == ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in my fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      arrPendidikan.push({
        empleduEmployeeId: 0,
        empleduJenjang: $("#txjenjang").val(),
        empleduInstansi: $("#txinstansi").val(),
        empleduJurusan: $("#txjurusan").val(),
        empleduTahunlulus: $("#txlulus").val(),
      });
      clearForm();
    }
  }
  tampil_pendidikan();
}
function tampil_pendidikan() {
  $("#table_pendidikan").DataTable().clear().destroy();
  $("#table_pendidikan > tbody").html("");
  $.each(arrPendidikan, function (idx, val) {
    html = "<tr>";
    html += "<td>" + val["empleduJenjang"] + "</td>";
    html += "<td>" + val["empleduInstansi"] + "</td>";
    html += "<td>" + val["empleduJurusan"] + "</td>";
    html += "<td>" + val["empleduTahunlulus"] + "</td>";
    html +=
      '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_pendidikan(' +
      idx +
      ')">Edit</button></td>';
    html +=
      '<td><button class="btn btn-danger btn-sm " onclick="hapus_pendidikan(' +
      idx +
      ')">Hapus</button></td>';
    html += "</tr>";
    $("#table_pendidikan> tbody").append(html);
    $(".input_pendidikan").val("");
  });
  $("#table_pendidikan").DataTable({
    responsive: true,
    processing: true,
    pagingType: "first_last_numbers",
    // order: [[0, 'asc']],
    dom:
      "<'row'<'col-3'l><'col-9'f>>" +
      "<'row dt-row'<'col-sm-12'tr>>" +
      "<'row'<'col-4'i><'col-8'p>>",
    language: {
      info: "Page PAGE of PAGES",
      lengthMenu: "MENU",
      search: "",
      searchPlaceholder: "Search..",
    },
  });
}

function edit_pendidikan(idx) {
  var pendidikan = arrPendidikan[idx];
  pendidikanId = idx;
  $("#txjenjang").val(pendidikan.empleduJenjang);
  $("#txinstansi").val(pendidikan.empleduInstansi);
  $("#txjurusan").val(pendidikan.empleduJurusan);
  $("#txlulus").val(pendidikan.empleduTahunlulus);
  $("#tmbhpen").hide();
  $("#updtpen").show();
}

function update_pendidikan() {
  var pendidikan = arrPendidikan[pendidikanId];
  let empleduJenjang = $("#txjenjang").val();
  let empleduInstansi = $("#txinstansi").val();
  let empleduJurusan = $("#txjurusan").val();
  let empleduTahunlulus = $("#txlulus").val();

  if (
    empleduJenjang == "" ||
    empleduInstansi == "" ||
    empleduJurusan == "" ||
    empleduTahunlulus == ""
  ) {
    Swal.fire({
      title: "Error!",
      text: "Please fill in my fields.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    if (pendidikan) {
      pendidikan.empleduJenjang = empleduJenjang;
      pendidikan.empleduInstansi = empleduInstansi;
      pendidikan.empleduJurusan = empleduJurusan;
      pendidikan.empleduTahunlulus = empleduTahunlulus;
      Swal.fire({
        title: "Success!",
        text: "Data Pendidikan update success",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(arrPendidikan);
      tambah_pendidikan();
      pendidikanId = null;
      $("#tmbhpen").show();
      $("#updtpen").hide();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Pendidikan data not found",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

function hapus_pendidikan(id) {
  pendidikanId = id;
  arrPendidikan.splice(id, 1);
  tambah_pendidikan();
  pendidikanId = null;
}

function valid_info(val, x) {
  $.post("employee/valid_info", {val: val, x: x}, function(res) {
      if (res.status == 'error') {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.msg,
          });
        
      }

          if (x == 1) {
              $('#txnama').val('').focus();
          } else if (x == 2) {
              $('#txkode').val('').focus();
          } else if (x == 3) {
              $('#txemail').val('').focus();
          } else if (x == 4) {
              $('#txktp').val('').focus();
          } else if (x == 5) {
              $('#txrekening').val('').focus();
          } else if (x == 6) {
              $('#txnobpjs').val('').focus();
          } else if (x == 7) {
              $('#txnpwp').val('').focus();
          }
       
  }, 'json');
}

function load_data() {
  $.post(
    "employee/load_data",
    {},
    function (data) {
      console.log(data);
      $("#table3").DataTable().clear().destroy();
      $("#table3 > tbody").html("");
      $.each(data.employee, function (idx, val) {
        html = "<tr>";
        html += "<td>" + val["employeeCode"] + "</td>";
        html += "<td>" + val["employeeName"] + "</td>";
        html += '<td><img src="'+ base_url + val['employeePhoto'] + '" width="300px"></td>'
        html +=
          '<td><span onclick="active_data(' +
          val["employeeId"] +
          "," +
          val["employeeActive"] +
          ')" class="badge ' +
          (val["employeeActive"] == "1" ? "bg-success" : "bg-danger") +
          ' ">' +
          (val["employeeActive"] == "1" ? "Active" : "Inactive") +
          "</span></td>";
        html +=
          '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' +
          val["employeeId"] +
          ')">Edit</button></td>';
        html +=
          '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' +
          val["employeeId"] +
          ')">Hapus</button></td>';
        html += "</tr>";
        $("#table3 > tbody").append(html);
      });
      $("#table3").DataTable({
        responsive: true,
        processing: true,
        pagingType: "first_last_numbers",
        // order: [[0, 'asc']],
        dom:
          "<'row'<'col-3'l><'col-9'f>>" +
          "<'row dt-row'<'col-sm-12'tr>>" +
          "<'row'<'col-4'i><'col-8'p>>",
        language: {
          info: "Page _PAGE_ of _PAGES_",
          lengthMenu: "MENU",
          search: "",
          searchPlaceholder: "Search..",
        },
      });
    },
    "json"
  );
}

function simpan_data() {
  console.log($('#txfoto')[0].files[0], JSON.stringify(arrAlamat), JSON.stringify(arrAsuransi))
  var formData = new FormData();
  formData.append('cabang', $('#txcabang').val())
  formData.append('bank', $('#txbank').val())
  formData.append('nama', $('#txnama').val())
  formData.append('namalkp', $('#txnamalkp').val())
  formData.append('kode', $('#txkode').val())
  formData.append('email', $('#txemail').val())
  formData.append('ktp', $('#txktp').val())
  formData.append('gender', $('#txgender').val())
  formData.append('golongan', $('#txgolongan').val())
  formData.append('namaibu', $('#txnamaibu').val())
  formData.append('agama', $('#txagama').val())
  formData.append('kebangsaan', $('#txkebangsaan').val())
  formData.append('rekening', $('#txrekening').val())
  formData.append('gaji', $('#txgaji').val())
  formData.append('bpjs', $('#txbpjs').val())
  formData.append('nobpjs', $('#txnobpjs').val())
  formData.append('npwp', $('#txnpwp').val())
  formData.append('foto', $('#txfoto')[0].files[0])
  formData.append('tglmasuk', $('#tglmasuk').val())
  formData.append('tglaktif', $('#tglaktif').val())
  formData.append('tglkeluar', $('#tglkeluar').val())
  formData.append('alamat', JSON.stringify(arrAlamat))
  formData.append('asuransi', JSON.stringify(arrAsuransi))
  formData.append('kontak', JSON.stringify(arrKontak))
  formData.append('pendidikan', JSON.stringify(arrPendidikan))

  $.ajax({
      url: 'employee/simpan_data',
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json',
      type: 'POST',
      success: function (data) {
          console.log(data.status);
          if (data.status === "error") {
              Swal.fire({
                  title: 'Error!',
                  text: data.msg,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          } else {
            Swal.fire({
                title: 'Success!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                $("#loginModal").modal('hide');
                reset_form(); 
            });
        }
      }
  });
} 

function hapus_data(id) {
  $.confirm({
    title: 'Konfirmasi!',
    content: 'Yakin ingin menghapus data?',
    theme: 'dark',
    buttons: {
      ya: function () {
        $.post('employee/delete', { id: id }, function (data) {
          if (data.status === 'success') {
            toastr.info("Data Berhasil Dihapus")
            $("#loginModal").modal('hide');
          } else {
            // alert(data.msg);
          }
          location.reload();
        }, 'json')
      },
      batal: function () {
        $.alert('Batal menghapus!');
      }
    }
  })
};

function edit_data(id) {
  $.post('employee/edit_table', { id: id }, function (data) {
      if (data.status === 'ok') {
          $("#txcabang").val(data.data.employee.employeeBranchId);
          $("#txbank").val(data.data.employee.employeeBankId);
          $("#txnama").val(data.data.employee.employeeName);
          $("#txnamalkp").val(data.data.employee.employeeFullname);
          $("#txkode").val(data.data.employee.employeeCode);
          $("#txemail").val(data.data.employee.employeeEmail);
          $("#txktp").val(data.data.employee.employeeKtp);
          $("#txgender").val(data.data.employee.employeeGender);
          $("#txgolongan").val(data.data.employee.employeeBlood);
          $("#txnamaibu").val(data.data.employee.employeeMother);
          $("#txagama").val(data.data.employee.employeeReligion);
          $("#txkebangsaan").val(data.data.employee.employeeNation);
          $("#txrekening").val(data.data.employee.employeeBill);
          $("#txgaji").val(data.data.employee.employeeSalaryType);
          $("#txbpjs").val(data.data.employee.employeeBpjsId);
          $("#txnobpjs").val(data.data.employee.employeeBpjsNo);
          $("#txnpwp").val(data.data.employee.employeeNpwp);
          $("#tglmasuk").val(data.data.employee.employeeInDate);
          $("#tglaktif").val(data.data.employee.employeeActiveDate);
          $("#tglkeluar").val(data.data.employee.employeeOutDate);
          $("#table_alamat").val(data.data.employee.empladdress);
          $("#table_asuransi").val(data.data.employee.emplinsuranse);
          $("#table_kontak").val(data.data.employee.emplcontact);
          $("#table_pendididikan").val(data.data.employee.empledu);
          arrAlamat = data.data.address
          tampil_alamat()
          arrAsuransi = data.data.insurance
          tampil_asuransi()
          arrKontak = data.data.contact
          tampil_kontak()
          arrPendidikan = data.data.education
          tampil_pendidikan()
          $("#loginModal").data('id', id);
          $("#loginModal").modal('show');
          $(".btn-submit").hide();
          $(".btn-editen").show();
          $("#txbank").trigger('change');
          $(".cnclalmt").hide();
          $(".cnclasr").hide();
          $(".cnclcon").hide();
          $(".cnclpen").hide();
      } else {
          Swal.fire({
              title: 'Error!',
              text: data.msg,
              icon: 'error',
              confirmButtonText: 'OK'
          })
      }
  }, 'json');
}

function update_data() {
  var id = $("#loginModal").data("id");
  var empladdress = JSON.stringify(arrAlamat);
  var emplinsuranse = JSON.stringify(arrAsuransi);
  var emplcontact = JSON.stringify(arrKontak);
  var empledu = JSON.stringify(arrPendidikan);

  let employeeData = {
    id: id,
    employeeBranchId: $("#txcabang").val(),
    employeeBankId: $("#txbank").val(),
    employeeName: $("#txnama").val(),
   
   
  };

  let employeeTable = {
    employeeFullname: $("#txnamalkp").val(),
    employeeCode: $("#txkode").val(),
    employeeEmail: $("#txemail").val(),
    employeeKtp: $("#txktp").val(),
    employeeGender: $("#txgender").val(),
    employeeBlood: $("#txgolongan").val(),
    employeeMother: $("#txnamaibu").val(),
    employeeReligion: $("#txagama").val(),
    employeeNation: $("#txkebangsaan").val(),
    employeeBill: $("#txrekening").val(),
    employeeSalaryType: $("#txgaji").val(),
    employeeBpjsId: $("#txbpjs").val(),
    employeeBpjsNo: $("#txnobpjs").val(),
    employeeNpwp: $("#txnpwp").val(),
    employeeInDate: $("#tglmasuk").val(),
    employeeActiveDate: $("#tglaktif").val(),
    employeeOutDate: $("#tglkeluar").val(),
    empladdress: empladdress,
    emplinsuranse: emplinsuranse,
    emplcontact: emplcontact,
    empledu: empledu,
  };
  var combinedSettings = Object.assign({}, employeeData, employeeTable);
  if (Object.values(employeeData).some((val) => val === "")) {
    Swal.fire({
      title: "Error!",
      text: "Please fill out all fields",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    $.post(
      "employee/update",
      combinedSettings,
      function (data) {
        if (data.status === "success") {
          Swal.fire({
            title: "Success!",
            text: data.msg,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            $("#loginModal").modal("hide");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        load_data();
      },
      "json"
    );
  }
}
function active_data(id, status) {
  $.confirm({
    title: 'Ubah status',
    content: 'Yakin ingin mengubah status?',
    theme: 'dark',
    buttons: {
      Ubah: function () {
        if (status === 1) {
          $.post('employee/active', { id: id, status: status }, function (data) {
            if (data.status === 'success') {
              $.dialog({
                title: 'Status Diubah!',
                content: 'status berhasil di non-aktifkan',
                theme: 'dark',
              }); 
              $("#loginModal").modal('hide');
            } else {
              alert(data.msg);
            }
            location.reload();
          }, 'json')
        } else {
          if (status === 0) {
            $.post('employee/active', { id: id, status: status }, function (data) {
              if (data.status === 'success') {
                $.dialog({
                  title: 'Status Diubah!',
                  content: 'status berhasil di aktifkan',
                  theme: 'dark',
                });
                $("#loginModal").modal('hide');
              } else {
                alert(data.msg);
              }
              location.reload();
            }, 'json')
          }
        }
      },
      Batal: function () {
        $.alert('Batal mengubah status');
      }
    }
  }
  )
};

function reset_form() {

  $(".input_alamat").val('');
  $(".input_informasi").val('');
  $(".input_asuransi").val('');
  $(".input_kontak").val('');
  $(".input_pendididikan").val('');
  tampil_alamat()
  tampil_asuransi()
  tampil_kontak()
  tampil_pendidikan()
}

function checkFormInputs() {
  let isAlamatFilled = false;
  $(".input_alamat").each(function () {
    if ($(this).val() !== "") {
      isAlamatFilled = true;
    }
  });

  if (isAlamatFilled) {
    $("#btn-batal1").show();
  } else {
    $("#btn-batal1").hide();
  }

  let isAsuransiFilled = false;
  $(".input_asuransi").each(function () {
    if ($(this).val() !== "") {
      isAsuransiFilled = true;
    }
  });

  if (isAsuransiFilled) {
    $("#btn-batal2").show();
  } else {
    $("#btn-batal2").hide();
  }

  let isKontakFilled = false;
  $(".input_kontak").each(function () {
    if ($(this).val() !== "") {
      isKontakFilled = true;
    }
  });

  if (isKontakFilled) {
    $("#btn-batal3").show();
  } else {
    $("#btn-batal3").hide();
  }

  let isPendidikanFilled = false;
  $(".input_pendidikan").each(function () {
    if ($(this).val() !== "") {
      isPendidikanFilled = true;
    }
  });

  if (isPendidikanFilled) {
    $("#btn-batal4").show();
  } else {
    $("#btn-batal4").hide();
  }
}



function clearForm() {
  // Clear and reset all fields
  $("#txjalan").val("");
  $("#txkelurahan").val("");
  $("#txkecamatan").val("");
  $("#txkota").val("");
  $("#txprovinsi").val("");
  $("#txphone").val("");
  $("#tmbhalmt").show();
  $("#updtalmt").hide();

  $("#txasuransi").val("");
  $("#txnoasuransi").val("");
  $("#tmbhasuransi").show();
  $("#updtasrnsi").hide();

  $("#txnamak").val("");
  $("#txalamatk").val("");
  $("#txprofesi").val("");
  $("#txhubungan").val("");
  $("#txphonek").val("");
  $("#tmbhkntk").show();
  $("#updtkntk").hide();

  $("#txjenjang").val("");
  $("#txinstansi").val("");
  $("#txjurusan").val("");
  $("#txlulus").val("");
  $("#tmbhpen").show();
  $("#updtpen").hide();

  $("#btn-batal1").hide();
  $("#btn-batal2").hide();
  $("#btn-batal3").hide();
  $("#btn-batal4").hide();
}

function openModal() {
  reset_form()
  arrAlamat = [];
  arrAsuransi = [];
  arrKontak = [];
  arrPendidikan = [];
  alamatId = null;
  asuransiId = null;
  load_cabang();
  tampil_alamat();
  tampil_asuransi();
  tampil_kontak();
  tampil_pendidikan();
  $("#loginModal").modal("show");
}

function load_cabang(){
  $.post("employee/load_cabang",function(res){
    $('#txcabang,#txbank,#txbpjs,#txasuransi').empty()
    $('#txcabang').append('<option value="" disabled-selected>Pilih Kantor Cabang </option>')
    $.each(res.data_kantor,function(i,v){
      $('#txcabang').append('<option value="'+v.branchId+'">'+v.branchName+'</option>')
    })
    
    
    $('#txbank').append('<option value="" disabled-selected>Pilih Bank </option>')
    $.each(res.data_bank,function(i,v){
      $('#txbank').append('<option value="'+v.bankId+'">'+v.bankName+'</option>')
    })
    
   
    $('#txbpjs').append('<option value="" disabled-selected>Pilih Bpjs </option>')
    $.each(res.data_bpjs,function(i,v){
      $('#txbpjs').append('<option value="'+v.bpjsId+'">'+v.bpjsName+'</option>')
    })

    
    $('#txasuransi').append('<option value="" disabled-selected>Pilih Cabang </option>')
    $.each(res.data_insurance,function(i,v){
      $('#txasuransi').append('<option value="'+v.insuranceId+'">'+v.insuranceType+'</option>')
    })
  },'json');
}

function importModal() {
  $("#importModal").modal("show");
}

function import_excel(){
  var formData = new FormData();
  formData.append('file', $('#tximport')[0].files[0])
  
  $.ajax({
      url: 'employee/import_excel',
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json',
      type: 'POST',
      success: function (data) {
          console.log(data.status);
          if (data.status === "error") {
              Swal.fire({
                  title: 'Error!',
                  text: data.msg,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          } else {
            Swal.fire({
                title: 'Success!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                $("#importModal").modal('hide');
               
            });
        }
      }
  });
}



$(document).ready(function () {
  $(".angka").keydown(function (e) {
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
      (e.keyCode == 65 && e.ctrlKey === true) ||
      (e.keyCode == 67 && e.ctrlKey === true) ||
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });
  $(".btn-closed").click(function () {
    // reset_form()
    $(".btn-batal").show();
  });

  $(".btn-add").click(function () {
    // reset_form();
    $(".btn-submit").show();
    $(".btn-editen").hide();
    $(".btn-batal1").show();
    $(".btn-batal2").show();
    $(".btn-batal3").show();
    $(".btn-batal4").show();
    $("#tmbhalmt").show();
    $("#updtalmt").hide();
    $("#tmbhasuransi").show();
    $("#updtasrnsi").hide();
    $("#tmbhkntk").show();
    $("#updtkntk").hide();
    $("#tmbhpen").show();
    $("#updtpen").hide();
  });

  $(".btn-add").click(function () {
    $(".btn-submit").show();
    $(".btn-update").hide();
  });

  $("#btn-batal1, #btn-batal2, #btn-batal3, #btn-batal4").on("click", function () {
    clearForm();
  });

  $(".input_alamat, .input_asuransi, .input_kontak, .input_pendidikan").on("input", function () {
    checkFormInputs();
  });

  $(".page-title").html("PERSONAL");

  checkFormInputs();
  load_cabang()
  load_data();
});
