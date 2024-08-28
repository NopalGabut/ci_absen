function load_data() {
    $.post("employment/load_data", {}, function (data) {
        console.log(data); 
        $("#table3 > tbody").html(''); 
        $.each(data.employment, function (idx, val) {
            html = '<tr>';
            html += '<td>' + val['employmentId'] + '</td>';
            html += '<td>' + val['departmentName'] + '</td>';
            html += '<td>' + val['kode'] + '</td>';
            html += '<td>' + val['nama'] + '</td>';
            html += '<td>' + val['atasan'] + '</td>';
            html += '<td><span onclick="active_data(' + val['employmentId'] + ',' + val['employmentActive'] + ')" class="badge ' + ((val['employmentActive'] == '1') ? 'bg-success' : 'bg-danger') + '">' + ((val['employmentActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>';
            html += '<td><button class="btn btn-warning btn-sm btn-edit" onclick="edit_data(' + val['employmentId'] + ')"><i class="fas fa-edit"> </i></button></td>';
            html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['employmentId'] + ')"><i class="fas fa-trash"></i></button></td>';
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
    $.post('employment/loadDepartment', function( res ){
        $("#txdepartment").empty()
        $("#txdepartment").append('<option value = "">Pilih Department</option>')
        $.each( res.data_department , function ( i, v) {
            $("#txdepartment").append('<option value = "'+ v.departmentId+'">'+ v.departmentName+'</option>')             
        }
        ) 
    },'json');
  }
  function load_atasan(id){
    $.post('employment/loadDepartment', {id:id}, function( res ){
        $("#txatasan").empty()
        $("#txatasan").append('<option value = "">Pilih Atasan</option>')
        $.each( res.data_atasan , function ( i, v) {
            $("#txatasan").append('<option value = "'+ v.employmentId+'">'+ v.atasan+'</option>')             
        }
        ) 
    },'json');
  }



  function simpan_data() {
    let department = $("#txdepartment").val();
    let atasan = $("#txatasan").val();
    let kode = $("#txcode").val();
    let nama = $("#txnama").val();

    console.log({
        txdepartment: department,
        txatasan: atasan,
        txcode: kode,
        txnama: nama,
    });

    if (department === "" || kode === "" || nama === "") {
        Swal.fire({
            title: 'Data Tidak Lengkap',
            text: 'Data yang dimasukkan masih belum lengkap',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    } else {
        $.post("employment/create", {
            txdepartment: department,
            txatasan: atasan,
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

function edit_data(id) {
  $.post('employment/edit_table', { id: id }, function (data) {
      // Populate the form with existing data
      $("#txcode").val(data.data.employmentCode);
      $("#txnama").val(data.data.employmentName);

      
      $.post('employment/loadDepartment', function(res) {
          $("#txdepartment").empty();
          $("#txdepartment").append('<option value="">Pilih Department</option>');
          $.each(res.data_department, function(i, v) {
              let selected = (v.departmentId == data.data.employmentDepartmentId) ? 'selected' : '';
              $("#txdepartment").append('<option value="'+v.departmentId+'" '+selected+'>'+v.departmentName+'</option>');
          });
      }, 'json');

    
      $.post('employment/loadDepartment', { id: data.data.employmentDepartmentId }, function(res) {
          $("#txatasan").empty();
          $("#txatasan").append('<option value="">Pilih Atasan</option>');
          $.each(res.data_atasan, function(i, v) {
              let selected = (v.employmentId == data.data.employmentParentEmploymentId) ? 'selected' : '';
              $("#txatasan").append('<option value="' + v.employmentId + '" ' + selected + '>' + v.atasan + '</option>');
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
    let employmentCode = $("#txcode").val();
    let employmentName = $("#txnama").val();
    let employmentDepartmentId = $("#txdepartment").val();
    let employmentParentEmploymentId = $("#txatasan").val();
    
    
    if (employmentCode === "" || employmentName === ""|| employmentDepartmentId === ""|| employmentParentEmploymentId === ""){
      Swal.fire({
        title: 'Error!',
        text: data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      $.post('employment/update_table', { id: id, employmentDepartmentId: employmentDepartmentId, employmentParentEmploymentId: employmentParentEmploymentId, employmentCode: employmentCode, employmentName: employmentName}, function(data) {
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
          $.post('employment/delete', { id: id }, function (data) {
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
            $.post('employment/active', { id: id, status: status }, function (data) {
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
              $.post('employment/active', { id: id, status: status }, function (data) {
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