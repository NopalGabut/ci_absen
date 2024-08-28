function simpan_data() {
    let kode = $("#txcode").val();
    let nama = $("#txnama").val();
    let kelas = $("#txkelas").val();
    let premi = $("#txpremi").val();
    let perusahaan = $("#txperusahaan").val();
    let karyawan = $("#txkaryawan").val();
    if (kode == "" || nama == "" || kelas == "" || premi == "" || perusahaan == "" || karyawan == "") {
        Swal.fire({
            text: "Data Yang Dimasukkan Masih Belum Lengkap",
            icon: "question"
          });
    } else{
        $.post("bpjs/create",
      {
          txcode: kode,
          txnama: nama,
          txkelas: kelas,
          txpremi: premi,
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
    $.post("bpjs/load_data", {}, function (data) {
        console.log(data); // Tambahkan ini untuk debugging
        $("#table3 > tbody").html(''); // Pastikan ID tabel adalah table3
        $.each(data.bpjs, function (idx, val) {
            var html = '<tr>';
            html += '<td>' + val['bpjsId'] + '</td>';
            html += '<td>' + val['bpjsClientId'] + '</td>';
            html += '<td>' + val['bpjsCode'] + '</td>';
            html += '<td>' + val['bpjsName'] + '</td>';
            html += '<td>' + val['bpjsClass'] + '</td>';
            html += '<td>' + val['bpjsTotalBill'] + '</td>';
            html += '<td>' + val['bpjsCompPercent'] + '</td>';
            html += '<td>' + val['bpjsEmplPercent'] + '</td>';
            html += '<td><span onclick="active_data(' + val['bpjsId'] + ',' + val['bpjsActive'] + ')" class="badge ' + ((val['bpjsActive'] == '1') ? 'bg-success' : 'bg-danger') + '">' + ((val['bpjsActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>';
            html += '<td><button class="btn btn-warning btn-sm btn-edit" onclick="edit_data(' + val['bpjsId'] + ')"><i class="fas fa-edit"> </i></button></td>';
            html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['bpjsId'] + ')"><i class="fas fa-trash"></i></button></td>';
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

function edit_data(id) {
    $.post('bpjs/edit_table', { id: id }, function (data) {
      $("#txcode").val(data.data.bpjsCode);
      $("#txnama").val(data.data.bpjsName);
      $("#txkelas").val(data.data.bpjsClass);
      $("#txpremi").val(data.data.bpjsTotalBill);
      $("#txperusahaan").val(data.data.bpjsCompPercent);
      $("#txkaryawan").val(data.data.bpjsEmplPercent);
      $("#loginModal").data('id', id); 
      $("#loginModal").modal('show');
      $(".btn-submit").hide();
      $(".btn-editen").show();
    }, 'json')
  }
  
  function confirmDelete(id) {
    $.confirm({
      title: 'Konfirmasi!',
      content: 'Yakin ingin menghapus data?',
      theme: 'dark',
      buttons: {
        ya: function () {
          $.post('bpjs/delete', { id: id }, function (data) {
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

  function update_data(){
    var id = $("#loginModal").data('id');
    let bpjsCode = $("#txcode").val();
    let bpjsName = $("#txnama").val();
    let bpjsClass = $("#txkelas").val();
    let bpjsTotalBill = $("#txpremi").val();
    let bpjsCompPercent = $("#txperusahaan").val();
    let bpjsEmplPercent = $("#txkaryawan").val();
    
    if (bpjsCode === "" || bpjsName === ""|| bpjsClass === ""|| bpjsTotalBill === ""|| bpjsCompPercent === ""|| bpjsEmplPercent === ""){
      Swal.fire({
        title: 'Error!',
        text: data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      $.post('bpjs/update_table', { id: id, bpjsCode: bpjsCode, bpjsName: bpjsName, bpjsClass: bpjsClass, bpjsTotalBill: bpjsTotalBill, bpjsCompPercent: bpjsEmplPercent, bpjsEmplPercent: bpjsEmplPercent}, function(data) {
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

  function active_data(id, status) {
    $.confirm({
      title: 'Ubah status',
      content: 'Yakin ingin mengubah status?',
      theme: 'dark',
      buttons: {
        Ubah: function () {
          if (status === 1) {
            $.post('bpjs/active', { id: id, status: status }, function (data) {
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
              $.post('bpjs/active', { id: id, status: status }, function (data) {
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
    const companyPercent = parseFloat($('#txperusahaan').val()) || 0;
    const employeePercent = 100 - companyPercent;
    $('#txkaryawan').val(employeePercent)
} 
function changeemp(){
    const employeePercent = parseFloat($('#txkaryawan').val()) || 0;
    const companyPercent = 100 - employeePercent;
    $('#txperusahaan').val(companyPercent)  
}

function reset_form(){
  $('#txcode').val('');
  $('#txnama').val('');
  $('#txkelas').val('');
  $('#txpremi').val('');
  $('#txperusahaan').val('');
  $('#txkaryawan').val('');

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
