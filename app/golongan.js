function load_data() {
    $.post("golongan/load_data", {}, function (data) {
        console.log(data);
        $("#table3").DataTable().clear().destroy();
        $("#table3 > tbody").html(''); 
        let index = 1;
        const reversedData = data.golongan.reverse();
        $.each(reversedData, function (idx, val) {
            html = '<tr>';
            html += '<td>' + index + '</td>';
            html += '<td>' + val['levelgroupCode'] + '</td>';
            html += '<td>' + val['levelgroupName'] + '</td>';
            html += '<td>' + desimal(val['levelgroupAmount']) + '</td>';
            html += '<td><span onclick="active_data(' + val['levelgroupId'] + ',' + val['levelgroupActive'] + ')" class="badge ' + ((val['levelgroupActive'] == '1') ? 'bg-success' : 'bg-danger') + '">' + ((val['levelgroupActive'] == '1') ? 'Aktif' : 'Non-Aktif') + '</span></td>';
            html += '<td><button class="btn btn-warning btn-sm btn-edit" onclick="edit_data(' + val['levelgroupId'] + ')"><i class="fas fa-edit"> </i></button></td>';
            html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['levelgroupId'] + ')"><i class="fas fa-trash"></i></button></td>';
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
    let kode = $("#txcode").val();
    let nama = $("#txnama").val();
    let nominal = $("#txnominal").val();
    let total = $("#txtotal").val();
    let hari = $("#txhari").val();
    let setengah = $("#txsetengah").val();
    let persen = $("#txpersen").val();
    let pokok = $("#txpokok").val();
  
    if (
      kode === "" ||
      nama === "" ||
      nominal === "" ||
      total === "" ||
      hari === "" ||
      setengah === ""
      // persen === "" ||
      // pokok === ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "Ada Form belum dimasukkan!!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      $.post(
        "golongan/create",
        {
          txcode: kode,
          txnama: nama,
          txnominal: nominal,
          txtotal: total,
          txhari: hari,
          txsetengah: setengah,
          txpersen: persen,
          txpokok: pokok,
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
  $.post('golongan/edit_table', { id: id }, function (data) {
      $("#txcode").val(data.data.levelgroupCode);
      $("#txnama").val(data.data.levelgroupName);
      $("#txnominal").val(desimal(data.data.levelgroupAmount));
      $("#txtotal").val(data.data.levelgroupDivide);
      $("#txhari").val(desimal(data.data.levelgroupNominal));
      $("#txsetengah").val(data.data.levelgroupHalfDay);
      $("#txpersen").val(data.data.levelgroupHalfPercent);
      $("#txpokok").val(data.data.levelgroupHalfAmount);
      $("#loginModal").data('id', id); 
      $("#loginModal").modal('show');
      $(".btn-submit").hide();
      $(".btn-editen").show();

      checkSetengahSelection();
  }, 'json');
}





function update_data()
{
  var id = $("#loginModal").data('id');
      let levelgroupCode = $("#txcode").val();
      let levelgroupName = $("#txnama").val();
      let levelgroupAmount = $("#txnominal").val();
      let levelgroupDivide = $("#txtotal").val();
      let levelgroupNominal = $("#txhari").val();
      let levelgroupHalfDay = $("#txsetengah").val();
      let levelgroupHalfPercent = $("#txpersen").val();
      let levelgroupHalfAmount = $("#txpokok").val();
  
  if (levelgroupCode === "" || levelgroupName === ""|| levelgroupAmount === ""||levelgroupDivide === ""|| levelgroupNominal === ""|| levelgroupHalfDay === ""|| levelgroupHalfPercent === ""|| levelgroupHalfAmount === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('golongan/update_table', { id: id, levelgroupCode: levelgroupCode, levelgroupName: levelgroupName, levelgroupAmount: levelgroupAmount, levelgroupDivide: levelgroupDivide, levelgroupNominal: levelgroupNominal, levelgroupHalfDay: levelgroupHalfDay, levelgroupHalfPercent: levelgroupHalfPercent, levelgroupHalfAmount: levelgroupHalfAmount}, function(data) {
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
          $.post('golongan/delete_table', { id: id }, function (data) {
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
            $.post('golongan/active', { id: id, status: status }, function (data) {
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
              $.post('golongan/active', { id: id, status: status }, function (data) {
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
    $('#txnominal').val('');
    $('#txtotal').val('');
    $('#txhari').val('');
    $('#txsetengah').val('');
    $('#txpersen').val('');
    $('#txpokok').val('');
}

function checkSetengahSelection() {
  let setengahValue = $('#txsetengah').val();

  if (!setengahValue || setengahValue === "1") {
      // Jika tidak ada nilai atau memilih "Tidak Digaji", disable input dan reset nilainya
      $('#txpersen').prop('disabled', true).val('');
      $('#txpokok').prop('disabled', true).val('');
  } else {
      // Jika ada nilai yang dipilih selain "Tidak Digaji", enable input
      $('#txpersen').prop('disabled', false);
      $('#txpokok').prop('disabled', false);
  }
}



function divide() {
  var amt = parseFloat($('[name="levelgroupAmount"]').val().replace(/,/gi, ""));
  var div = parseFloat($('[name="levelgroupDivide"]').val().replace(/,/gi, ""));
  $('[name="levelgroupNominal"]').val("");
  if (amt > 0 && div > 0) {
    nom = parseInt(amt / div);
    $('[name="levelgroupNominal"]').val(desimal(nom));
  }
}

function cekIsHalf() {
  console.log($('[name="levelgroupHalfDay"]').val());
  if ($('[name="levelgroupHalfDay"]').val() == "Tidak Digaji") {
    $('[name="levelgroupHalfPercent"], [name="levelgroupHalfAmount"]').attr(
      "disabled",
      true
    );
  } else {
    $('[name="levelgroupHalfPercent"], [name="levelgroupHalfAmount"]').attr(
      "disabled",
      false
    );
  }
}

function desimal(input) {
	var output = input
	if (parseFloat(input)) {
		input = new String(input); // so you can perform string operations
		var parts = input.split("."); // remove the decimal part
		parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
		output = parts.join(".");
	}

	return output;
}

function validateInput() {
  let selection = document.getElementById("txpersen").value;
  let inputField = document.getElementById("txpokok");

  if (selection == "0") { 
      // Jika pilih "Persen"
      validatePersent(inputField);
  } else if (selection == "1") {
      // Jika pilih "Amount"
      validateAmount(inputField);
  }
}

function validatePersent(inputField) {
  let max = 100;
  let min = 0;

  if (parseFloat(inputField.value) > max) {
      inputField.value = max;
  } else if (parseFloat(inputField.value) < min) {
      inputField.value = min;
  }
}

function validateAmount(inputField) {
  let maxAmount = parseFloat(document.getElementById("txhari").value.replace(/,/g, "")) || 0;

  if (parseFloat(inputField.value) > maxAmount) {
      inputField.value = maxAmount;
  } else if (parseFloat(inputField.value) < 0) {
      inputField.value = 0;
  }
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

document.getElementById("txpersen").addEventListener("change", validateInput);
document.getElementById("txpokok").addEventListener("input", validateInput);

  $("body").on('keyup','.angka.des',function(e){
		if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			this.value = this.value.replace(/[^0-9\.]/g, '');
		}
		$(this).val(desimal($(this).val()));
	});
	
     // ketika input dengan class angka focus, maka aluenya diselect semua
	$("body").on('focus','.angka',function(e){
		$(this).select();
	});


    $('#loginModal').on('hidden.bs.modal', function () {
      $('#txsetengah').val(''); 
      $('#txpersen').prop('disabled', true);
      $('#txpokok').prop('disabled', true);
      reset_form();
      checkSetengahSelection(); 
  });

  $('#txpersen').on('change', function() {
    var selectedValue = $(this).val(); 
    
    if (selectedValue === '0') {
        $('#labelPokok').text('Persen Pokok/Hari');  
    } else if (selectedValue === '1') {
        $('#labelPokok').text('Amount Pokok/Hari');  
    }
});
  
    $('#txsetengah').on('change', function () {
      checkSetengahSelection();
  });

  
    $(".btn-closed").click(function(){
        reset_form();
    });
  
    $(".btn-add").click(function(){
        $(".btn-submit").show();
        $(".btn-editen").hide();
        checkSetengahSelection(); 
    });
    load_data();
    checkSetengahSelection();
  });