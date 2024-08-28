function simpan_data() {
  let kode = $("#txcode").val();
  let nama = $("#txnama").val();
  let id = $("#txid").val();
  let jenis = $("#txjenis").val();
  let potongan = $("#txpotongan").val();
  let tagihan = $("#txtagihan").val();
  let perusahaan = $("#txperusahaan").val();
  let karyawan = $("#txkaryawan").val();

  console.log({
    txcode: kode,
    txnama: nama,
    txid: id,
    txjenis: jenis,
    txpotongan: potongan,
    txtagihan: tagihan,
    txperusahaan: perusahaan,
    txkaryawan: karyawan
});


  if (kode == "" || nama == "" || id == ""|| jenis == ""|| potongan == ""|| tagihan == ""|| perusahaan =="" || karyawan == "") {
      Swal.fire({
          text: "Data Yang Dimasukkan Masih Belum Lengkap",
          icon: "question"
        });
  } else{
      $.post("insurance/create",
    {
        txcode: kode,
        txnama: nama,
        txid: id,
        txjenis: jenis,
        txpotongan: potongan,
        txtagihan: tagihan,
        txperusahaan: perusahaan,
        txkaryawan: karyawan
    },
  function(data){
    console.log(data.status)
    if (data.status == "error"){
       toastr.error(data.msg)
    }else {
      toastr.success(data.msg)
      location.reload()
    }
    //alert("Data: " + data + "\nStatus: " + status);
  },'json');
  }
}

function load_data() {
  $.post("insurance/load_data", {}, function (data) {
      console.log(data); 
      $("#table3 > tbody").html(''); 
      $.each(data.insurance, function (idx, val) {
          html = '<tr>';
          html += '<td>' + val['insuranceId'] + '</td>';
          html += '<td>' + val['insuranceCode'] + '</td>';
          html += '<td>' + val['insuranceName'] + '</td>';
          html += '<td>' + val['insuranceTotalBill'] + '</td>';
          html += '<td><span onclick="active_data(' + val['insuranceId'] + ',' + val['insuranceActive'] + ')" class="badge ' + ((val['insuranceActive'] == '1') ? 'bg-success' : 'bg-danger') + '">' + ((val['insuranceActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>';
          html += '<td><button class="btn btn-warning btn-sm btn-edit" onclick="edit_data(' + val['insuranceId'] + ')"><i class="fas fa-edit"> </i></button></td>';
          html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['insuranceId'] + ')"><i class="fas fa-trash"></i></button></td>';
          html += '</tr>';
          $("#table3 > tbody").append(html);
      });
      $("#table3").DataTable().destroy();
      $("#table3").DataTable({
          responsive: true,
          processing: true,
          scroll: true,
          pagingType: 'first_last_numbers',
          order: [[0, 'desc']],
          dom: "<'row'<'col-3'l><'col-9'f>>" +
               "<'row dt-row'<'col-sm-12'tr>>" +
               "<'row'<'col-4'i><'col-8'p>>",
          language: {
              info: "Page _PAGE_ of _PAGES_",
              lengthMenu: "MENU",
              search: "",
              searchPlaceholder: "Search.."
          }
      });
  }, 'json');
}

function update_data(){
  var id = $("#loginModal").data('id');
  let insuranceCode = $("#txcode").val();
  let insuranceName = $("#txnama").val();
  let insuranceNo = $("#txid").val();
  let insuranceType = $("#txjenis").val();
  let insuranceTotalBill = $("#txtagihan").val();
  let insuranceSalaryCut = $("#txpotongan").val();
  let insuranceCompPersen = $("#txperusahaan").val();
  let insuranceEmplPersen = $("#txkaryawan").val();
  
  if (insuranceCode === "" || insuranceName === ""|| insuranceNo === ""|| insuranceType === ""|| insuranceTotalBill === ""|| insuranceSalaryCut === ""|| insuranceCompPersen === ""|| insuranceEmplPersen === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('insurance/update_table', { id: id, insuranceCode: insuranceCode, insuranceName: insuranceName, insuranceNo: insuranceNo,insuranceType: insuranceType, insuranceTotalBill: insuranceTotalBill, insuranceSalaryCut: insuranceSalaryCut, insuranceCompPersen: insuranceEmplPersen, insuranceEmplPersen: insuranceEmplPersen}, function(data) {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
  }, 'json');
}}

function edit_data(id) {
  $.post('insurance/edit_table', { id: id }, function (data) {
    $("#txcode").val(data.data.insuranceCode);
    $("#txnama").val(data.data.insuranceName);
    $("#txid").val(data.data.insuranceNo);
    $("#txjenis").val(data.data.insuranceType);
    $("#txtagihan").val(data.data.insuranceTotalBill);
    $("#txpotongan").val(data.data.insuranceSalaryCut);
    $("#txperusahaan").val(data.data.insuranceCompPersen);
    $("#txkaryawan").val(data.data.insuranceEmplPersen);
    $("#loginModal").data('id', id); 
    $("#loginModal").modal('show');
    $(".btn-submit").hide();
    $(".btn-editen").show();
  }, 'json')
}

function active_data(id, status) {
  $.confirm({
    title: 'Ubah status',
    content: 'Yakin ingin mengubah status?',
    theme: 'dark',
    buttons: {
      Ubah: function () {
        if (status === 1) {
          $.post('insurance/active', { id: id, status: status }, function (data) {
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
            $.post('insurance/active', { id: id, status: status }, function (data) {
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

function confirmDelete(id) {
  $.confirm({
    title: 'Konfirmasi!',
    content: 'Yakin ingin menghapus data?',
    theme: 'dark',
    buttons: {
      ya: function () {
        $.post('insurance/delete', { id: id }, function (data) {
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


function onmax(input, max){
  if(input.value > max ){
      input.value = max;
  }
}
function onmin(input, min) {
  if(input.value < min ){
      input.value = min;
  }
}

function changecomp(){
  const companyPersen = parseFloat($('#txperusahaan').val()) || 0;
  const employeePersen = 100 - companyPersen;
  $('#txkaryawan').val(employeePersen)
} 
function changeemp(){
  const employeePersen = parseFloat($('#txkaryawan').val()) || 0;
  const companyPersen = 100 - employeePersen;
  $('#txperusahaan').val(companyPersen)  
}


$(document).ready(function () {
  $(".tittle").html("BPJS");
  $(".page-tittle").html("BPJS");
  
  $(".angka").keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and . 188 untuk koma

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  });


  $(".btn-closed").click(function(){
      reset_form();
  });

  $(".btn-add").click(function(){
      $(".btn-submit").show();
      $(".btn-editen").hide();
  });
  load_data();
});