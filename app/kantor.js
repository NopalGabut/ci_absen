
function active_data(id, status) {
    $.confirm({
      title: 'Ubah status',
      content: 'Yakin ingin mengubah status?',
      theme: 'dark',
      buttons: {
        Ubah: function () {
          if (status === 1) {
            $.post('kantor/active', { id: id, status: status }, function (data) {
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
              $.post('kantor/active', { id: id, status: status }, function (data) {
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

  function simpan_data() {
    let kode = $("#txkode").val();
    let id = $("#txid").val();
    let email = $("#txemail").val();
    let telp = $("#txtelp").val();
    let region = $("#txregion").val();
    let kota = $("#txkota").val();
    let alamat = $("#txalamat").val();
    if (kode == "" || id == "" || email == "" || telp == "" || region == "" || kota == "" || alamat == "") {
        Swal.fire({
            text: "Data Yang Dimasukkan Masih Belum Lengkap",
            icon: "question"
          });
    } else{
        $.post("kantor/create",
      {
          txkode: kode,
          txid: id,
          txemail: email,
          txtelp: telp,
          txregion: region,
          txkota: kota,
          txalamat: alamat
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

  function update_data(){
  var id = $("#loginModal").data('id');
  let branchCode = $("#txkode").val();
  let branchName = $("#txnama").val();
  let branchEmail = $("#txemail").val();
  let branchTelp = $("#txtelp").val();
  let branchRegion = $("#txregion").val();
  let branchCity = $("#txkota").val();
  let branchAddress = $("#txalamat").val();
  
  if (branchCode === "" || branchName === ""|| branchEmail === ""|| branchTelp === ""|| branchRegion === ""|| branchCity === ""|| branchAddress === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('kantor/update_table', { id: id, branchCode: branchCode, branchName: branchName, branchEmail: branchEmail, branchTelp: branchTelp, branchRegion: branchRegion, branchCity: branchCity, branchAddress: branchAddress, }, function(data) {
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


  
  function load_data() {
      $.post("kantor/load_data",
        {
    
        },
        function (data) {
          console.log(data)
    
          $("#table3 > tbody").html('');
          $.each(data.kantor, function (idx, val) {
            html = '<tr>'
            html += '<td>' + val['branchId'] + '</td>'
            html += '<td>' + val['branchClientId'] + '</td>'
            html += '<td>' + val['branchCode'] + '</td>'
            html += '<td>' + val['branchName'] + '</td>'
            html += '<td>' + val['branchEmail'] + '</td>'
            html += '<td>' + val['branchTelp'] + '</td>'
            html += '<td>' + val['branchRegion'] + '</td>'
            html += '<td>' + val['branchCity'] + '</td>'
            html += '<td>' + val['branchAddress'] + '</td>'
            html += '<td><span onclick="pusat_data('+val['branchId']+','+val['branchIsCenter']+')" class="badge ' + ((val['branchIsCenter']== '1') ? 'bg-success' : 'bg-secondary' ) +' ">' +((val['branchIsCenter']== '1') ? 'Pusat' : 'Nonpusat' ) +'</span></td>'
            html += '<td><span onclick="active_data(' + val['branchId'] + ',' + val['branchActive'] + ')"  class="badge  ' + ((val['branchActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['branchActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>'
            html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['branchId'] + ')"><i class="fas fa-edit"> </i></button></td>'
            html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['branchId'] + ')"><i class="fas fa-trash"></i></button></td>'
            html += '</tr>'
            $("#table3 > tbody").append(html);
          });
          $("#table3").DataTable().destroy()
          $("#table3").DataTable({
            responsive: true,
            processing: true,
            scroll: true,
            pagingType: 'first_last_numbers',
            order: [[0, 'desc']],
            dom:
              "<'row'<'col-3'l><'col-9'f>>" +
              "<'row dt-row'<'col-sm-12'tr>>" +
              "<'row'<'col-4'i><'col-8'p>>",
            "language": {
              "info": "Page _PAGE_ of _PAGES_",
              "lengthMenu": "MENU",
              "search": "",
              "searchPlaceholder": "Search.."
            }
          });
    
        }, 'json');
    }

    function edit_data(id) {
        $.post('kantor/edit_table', { id: id }, function (data) {
          //reset_form();
          $("#txkode").val(data.data.branchCode);
          $("#txnama").val(data.data.branchName);
          $("#txemail").val(data.data.branchEmail);
          $("#txtelp").val(data.data.branchTelp);
          $("#txregion").val(data.data.branchRegion);
          $("#txkota").val(data.data.branchCity);
          $("#txalamat").val(data.data.branchAddress);
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
            $.post('kantor/delete', { id: id }, function (data) {
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

    function pusat_data(id, pusat) {
      if (pusat == 0) {
        Swal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda Ingin Menjadikan Pusat data ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, Jadikan Pusat',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            $.post('kantor/pusat', { id: id }, function(data) {
              if (data.pusat === 'success') {
                Swal.fire({
                  title: 'Success!',
                  text: data.msg,
                  icon: 'success',
                  confirmButtonText: 'OK'
                }).then(() => {
                  $("#loginModal").modal('hide');
                  location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Berhasil!',
                  text: data.msg,
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              }
            }, 'json');
          }
        });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  
  $(document).ready(function () {
      $(".tittle").html("Absensi-Kantor")
    $(".page-tittle").html("Kantor")

    $(".btn-closed").click(function(){
        reset_form()
    });
  
      $(".btn-add").click(function(){
        $(".btn-submit").show();
        $(".btn-editen").hide();
      })
    load_data();
  });