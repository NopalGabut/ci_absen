function load_data() {
    $.post("workgroup/load_data", {}, function (data) {
        console.log(data);
        $("#table3").DataTable().clear().destroy();
        $("#table3 > tbody").html(''); 
        let index = 1;
        const reversedData = data.workgroup.reverse();
        $.each(reversedData, function (idx, val) {
            html = '<tr>';
            html += '<td>' + index + '</td>';
            html += '<td>' + val['workgroupName'] + '</td>';
            html += '<td><span onclick="active_data(' + val['workgroupId'] + ',' + val['workgroupActive'] + ')" class="badge ' + ((val['workgroupActive'] == '1') ? 'bg-success' : 'bg-danger') + '">' + ((val['workgroupActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>';
            html += '<td><button class="btn btn-warning btn-sm btn-edit" onclick="edit_data(' + val['workgroupId'] + ')"><i class="fas fa-edit"> </i></button></td>';
            html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['workgroupId'] + ')"><i class="fas fa-trash"></i></button></td>';
            html += '</tr>';
            $("#table3 > tbody").append(html);
            index++;
        });
        
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

  function simpan_data() {
    let nama = $("#txnama").val();
  
    if (
      nama === "" 
    ) {
      Swal.fire({
        title: "Error!",
        text: "Ada Form belum dimasukkan!!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      $.post(
        "workgroup/create",
        {
          txnama: nama,
        },
        function (data) {
          console.log(data.status);
          if (data.status === "error") {
            Swal.fire({
              title: "Error!",
              text: data.msg,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: data.msg,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              $("#loginModal").modal("hide");
              load_data();
            });
          }
        },
        "json"
      );
    }
  }

function edit_data(id) {
  $.post('workgroup/edit_table', { id: id }, function (data) {
      $("#txnama").val(data.data.workgroupName);
      $("#loginModal").data('id', id); 
      $("#loginModal").modal('show');
      $(".btn-submit").hide();
      $(".btn-editen").show();

  }, 'json');
}

function update_data()
{
  var id = $("#loginModal").data('id');
      let workgroupName = $("#txnama").val();
  
  if (workgroupName === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('workgroup/update_table', { id: id, workgroupName: workgroupName}, function(data) {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          $("#loginModal").modal("hide");
          load_data();
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
          $.post('workgroup/delete_table', { id: id }, function (data) {
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
            $.post('workgroup/active', { id: id, status: status }, function (data) {
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
              $.post('workgroup/active', { id: id, status: status }, function (data) {
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
    
  });