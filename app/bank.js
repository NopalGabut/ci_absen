function reset_form()
    {
      $("#txrekening").val('').focus();
      $("#txbank").val('');
    }

function update_data() {
  var id = $("#loginModal").data('id');
  var bankBill = $("#txrekening").val();
  var bankName = $("#txbank").val();

  if (bankBill === "" || bankName === ""){
    toastr.info("Rekening atau Bank belum dimasukkan");
  }else{
    $.post('bank/update_table', { id: id, bankBill: bankBill, bankName: bankName }, function(data) {
      if (data.status === 'success') {
          toastr.info(data.msg);
          $("#loginModal").modal('hide');
          load_data();
      } else {
          alert(data.msg);
      }
  }, 'json');
  }
}


  function edit_data(id) {
    $.post('bank/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
            $("#txrekening").val(data.data.bankBill);
            $("#txbank").val(data.data.bankName);
            $("#loginModal").data('id', id); 
            $("#loginModal").modal('show');
            $(".btn-submit").hide();
            $(".btn-editen").show();

        } else {
            alert(data.msg);
        }
    }, 'json');
}  


function delete_data(id) {
  // if (confirm("Are you sure you want to delete this data?")) {
  //     $.post('bank/delete', { id: id }, function(data) {
  //         if (data.status === 'success') {
  //             alert(data.msg);
  //             $("#loginModal").modal('hide');
  //             location.reload();
  //         } else {
  //             alert(data.msg);
  //         }
  //     }, 'json');
  // }
  $.confirm({
    title: 'Hapus Data',
    content: 'Apakah kamu yakin ingin menghapus data?',
    type: 'blue',
    typeAnimated: true,
    buttons: {
        tryAgain: {
            text: 'Delete',
            btnClass: 'btn-red',
            action: function(){
              /*if (confirm("Are you sure you want to delete this data?"))*/ {
                $.post('bank/delete', { id: id }, function(data) {
                    if (data.status === 'success') {
                        toastr.info(data.msg);
                        load_data();
                    } else {
                        alert(data.msg);
                    }
                }, 'json');
            }
            }
        },
        close: function () {
        }
    }
});
}

function active_data(id,status){
  if(status == 1){
    /*if (confirm('Apakah Anda Ingin MENONAKTIFKAN data ini?')) {
      $.post('bank/active', {id:id, status:status}, function (data) {
        if (data.status === 'success') {
          alert(data.msg);
          $("#loginModal").modal('hide');
          location.reload();
        } else {
          alert(data.msg);
        }
      }, 'json')*/  
      $.confirm({
        title: 'Nonaktifkan Data',
        content: 'Apakah yakin ingin menonaktifkan data?',
        buttons: {
            cancel: function () {
                $.alert('Canceled!');
            },
            somethingElse: {
                text: 'Disabled Data',
                btnClass: 'btn-red',
                action: function(){
                  $(".btn-red").css({
                    "background-color": "#FF0000",
                    "color": "#FFFFFF"
                });
                  /*if (confirm('Apakah Anda Ingin MENONAKTIFKAN data ini?'))*/ 
                    $.post('bank/active', {id:id, status:status}, function (data) {
                      if (data.status === 'success') {
                        toastr.info(data.msg);
                        $("#loginModal").modal('hide');
                        load_data();
                      } else {
                        toastr.info(data.msg);
                      }
                    }, 'json') 
                }
            }
        }
    });
  }else{
  //   if(status == 0){
  //   if (confirm('Apakah Anda Ingin MENGAKTIFKAN data ini?')) {
  //     $.post('bank/active', {id:id, status:status}, function (data) {
  //       if (data.status === 'success') {
  //         alert(data.msg);
  //         $("#loginModal").modal('hide');
  //         location.reload();
  //       } else {
  //         alert(data.msg);
  //       }
  //     }, 'json')  }
  // }

  $.confirm({
    title: 'Aktifkan Data',
    content: 'Apakah yakin ingin mengktifkan data?',
    animation: 'zoom',
    closeAnimation: 'scale',
    buttons: {
        cancel: function () {
            $.alert('Canceled!');
        },
        somethingElse: {
            text: 'Aktifkan Data',
            btnClass: 'btn-green',
            keys: ['enter', 'shift'],
            action: function(){
              if(status == 0){
                /*if (confirm('Apakah Anda Ingin MENGAKTIFKAN data ini?'))*/ {
                  $.post('bank/active', {id:id, status:status}, function (data) {
                    if (data.status === 'success') {
                      toastr.info(data.msg);
                      load_data();
                    } else {
                      toastr.info(data.msg);
                    }
                  }, 'json')  }
              }
            }
        }
    }
});
}

}



function edit_data(id) {
  $.post('bank/edit_table', { id: id }, function (data) {
    console.log(data.data.bankBill)
    console.log(data.data.bankName)
    console.log(data.data.bankId)
    //reset_form();
    $("#txrekening").val(data.data.bankBill);
    $("#txbank").val(data.data.bankName);
    $("#loginModal").modal('show');
    $(".btn-submit").hide();
    $(".btn-editen").show();
  }, 'json')
}    

function load_data()
    {
      $.post("bank/load_data",

      function(data){
        console.log(data)
        $("#table2").DataTable().clear().destroy()
        $("#table2 > tbody").html('');
        $.each(data.bank,function (idx, val) 
        {
            html='<tr>'
            html+='<td>'+val['bankId']+'</td>'
            html+='<td>'+val['bankClientId']+'</td>'
            html+='<td>'+val['bankBill']+'</td>'
            html+='<td>'+val['bankName']+'</td>'
            html+='<td><span onclick="active_data('+val['bankId']+','+val['bankActive']+')"  class="badge  ' + ((val['bankActive']== '1') ? 'bg-success' : 'bg-danger' ) +' ">' +((val['bankActive']== '1') ? 'Active' : 'Inactive' ) +'</span></td>'
            html+='<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data('+val['bankId']+')">Edit</button></td>'
            html += '<td><button class="btn btn-danger btn-sm" onclick="delete_data(' + val['bankId'] + ')">Hapus</button></td>';
            html+='</tr>'
            $("#table2 > tbody").append(html);
        });
       
    
        $("#table2").DataTable({
          responsive: true,
           processing: true,
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

      },'json');
    }

  
    
$(document).ready(function(){

    $(".page-title").html("BANK")  
    $(".btn-closed").click(function(){
      reset_form()
  
    });

    $(".btn-add").click(function(){
      $(".btn-submit").show();
      $(".btn-editen").hide();
    })

    // $(".btn-editen").click(function () {
    //   let rekening = $("#txrekening").val();
    //   let bank = $("#txbank").val();
    //     if(rekening === "bankBill" || bank === "bankName"){
    //       alert("No Rekening sudah ada")
    //     }else{
    //       $.post("bank/update_bank",
    //       {
    //         txrekening: rekening,
    //         txbank: bank
    //       },
    //       function(data,status){
    //         console.log(data.status)
    //         if (data.status == "Error"){
    //         }else {
    //           reset_form()
    //         }
    //         //alert("Data: " + data + "\nStatus: " + status);
    //       },'json');
    //     }
    // }); 

    load_data();
  });  

function simpan_data(){
  let rekening = $("#txrekening").val();
      let bank = $("#txbank").val();
        if (rekening === "" || bank === ""){
          alert("Rekening atau Bank belum dimasukkan");
        }else{
          $.post("bank/create",
        {
          txrekening: rekening,
          txbank: bank
        },
      function(data){
        console.log(data.status)
        if (data.status == "error"){
           toastr.error(data.msg)
        }else {
          toastr.success(data.msg)
          reset_form()
        }
        //alert("Data: " + data + "\nStatus: " + status);
      },'json');
      }
}