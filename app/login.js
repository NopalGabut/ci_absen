$(document).ready(function () {
  $("#btn_login").click(function () {
    username = $("#txusername").val();
    password = $("#txpassword").val();

    if (username === "" || password === "") {
      if (username === "") {
        toastr.warning("Username harus diisi");
      }
      if (password === "") {
        toastr.warning("Password harus diisi");
      }
    } else {
      toastr.info("Mengverifikasi User");
      $.post(
        "login/cek_login",
        {
          username: username,
          password: password,
        },
        function (data, status) {
          console.log(data.status);
          if (data.status == "error") {
            toastr.warning("gagal");
          } else {
            toastr.info("Berhasil Login");
            window.location.href = "http://localhost/ci_master/home"
          }
        },
        "json"
      );
    }
  });
});

function logout() {
  $.post('login/logout', function() {
    window.location.href = "http://localhost/ci_master";
  });
}

// Menampilkan dialog konfirmasi logout
function confirmLogout() {
  $.confirm({
    title: 'Logout?',
    content: 'Your time is out, you will be automatically logged out in 10 seconds.',
    autoClose: 'logoutUser|10000',
    buttons: {
      logoutUser: {
        text: 'Logout',
        action: function () {
          logout();
        }
      },
      cancel: function () {
        $.alert('Canceled');
      }
    }
  });
}

// Panggil fungsi confirmLogout sesuai dengan kebutuhan Anda
$("#btn_logout").click(function() {
  confirmLogout();
});
