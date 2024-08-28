function load_data() {
    $.post("department/load_data", {}, function (data) {
        console.log(data); 
        $("#table3 > tbody").html(''); 
        $.each(data.department, function (idx, val) {
            html = '<tr>';
            html += '<td>' + val['departmentId'] + '</td>';
            html += '<td>' + val['departmentCode'] + '</td>';
            html += '<td>' + val['departmentName'] + '</td>';
            html += '<td>' + val['divisionName'] + '</td>';
            html += '<td><span onclick="active_data(' + val['departmentId'] + ',' + val['departmentActive'] + ')" class="badge ' + ((val['departmentActive'] == '1') ? 'bg-success' : 'bg-danger') + '">' + ((val['departmentActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>';
            html += '<td><button class="btn btn-warning btn-sm btn-edit" onclick="edit_data(' + val['departmentId'] + ')"><i class="fas fa-edit"> </i></button></td>';
            html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['departmentId'] + ')"><i class="fas fa-trash"></i></button></td>';
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

  function load_divisi(){
    $.post('department/loadDivisi', function( res ){
        $("#txdivisi").empty()
        $("#txdivisi").append('<option value = "">Pilih Divisi</option>')
        $.each( res.data_divisi , function ( i, v) {
            $("#txdivisi").append('<option value = "'+ v.divisionId+'">'+ v.divisionName+'</option>')             
        }
        ) 
    },'json');
  }

  function simpan_data() {
    let divisi = $("#txdivisi").val();
    let kode = $("#txcode").val();
    let nama = $("#txnama").val();

    console.log({
        txdivisi: divisi,
        txcode: kode,
        txnama: nama,
    });

    if (divisi === "" || kode === "" || nama === "") {
        Swal.fire({
            title: 'Data Tidak Lengkap',
            text: 'Data yang dimasukkan masih belum lengkap',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    } else {
        $.post("department/create", {
            txdivisi: divisi,
            txcode: kode,
            txnama: nama,
        }, function(data) {
            console.log(data.status);
            if (data.status === "error") {
                Swal.fire({
                    title: 'Error',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Berhasil',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }
        }, 'json');
    }
}

function edit_data(id){
    $.post('department/edit_table', { id: id }, function (data) {
        // Populate the form with existing data
        $("#txcode").val(data.data.departmentCode);
        $("#txnama").val(data.data.departmentName);

        // Load divisions and set the selected division
        $.post('department/loadDivisi', function(res) {
            $("#txdivisi").empty();
            $("#txdivisi").append('<option value="">Pilih Divisi</option>');
            $.each(res.data_divisi, function(i, v) {
                let selected = (v.divisionId == data.data.departmentDivisionId) ? 'selected' : '';
                $("#txdivisi").append('<option value="'+v.divisionId+'" '+selected+'>'+v.divisionName+'</option>');
            });
        }, 'json');

        // Show the modal and toggle buttons
        $("#loginModal").data('id', id); 
        $("#loginModal").modal('show');
        $(".btn-submit").hide();
        $(".btn-editen").show();
    }, 'json');
}


function update_data(){
    var id = $("#loginModal").data('id');
    let departmentCode = $("#txcode").val();
    let departmentName = $("#txnama").val();
    let divisionName = $("#txdivisi").val();
    
    if (departmentCode === "" || departmentName === ""|| divisionName === ""){
      Swal.fire({
        title: 'Error!',
        text: data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      $.post('department/update_table', { id: id, divisionName: divisionName, departmentCode: departmentCode, departmentName: departmentName}, function(data) {
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

  function confirmDelete(id) {
    $.confirm({
      title: 'Konfirmasi!',
      content: 'Yakin ingin menghapus data?',
      theme: 'dark',
      buttons: {
        ya: function () {
          $.post('department/delete_table', { id: id }, function (data) {
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
  
  function active_data(id, status) {
    $.confirm({
      title: 'Ubah status',
      content: 'Yakin ingin mengubah status?',
      theme: 'dark',
      buttons: {
        Ubah: function () {
          if (status === 1) {
            $.post('department/active', { id: id, status: status }, function (data) {
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
              $.post('department/active', { id: id, status: status }, function (data) {
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

function reset_form(){
    $('#txcode').val('');
    $('#txnama').val('');
    $('#txdivisi').val('');
}

$(document).ready(function () {
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
    load_divisi();
    
  });