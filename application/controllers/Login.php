<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	
	 
	public function index()
	{
        if (isset($this->session->absen_login)) {
            redirect('home');
        }else {
            $this->load->view('v_login');
           }
		
	}

    public function cek_login() {
        $username = $this->input->post("username");
        $password = $this->input->post("password");
        
        $sql = "SELECT * FROM user WHERE userEmail='$username' AND userpassword='$password'; ";
        $exc = $this->db->query($sql);
        
        if ($exc->num_rows() > 0) {
            $data['data'] = $exc->row();
            $data['status'] = "oke";
            $sesi['absen_login'] = 1;
            $sesi['username'] = $data['data']->userEmail;
            $this->session->set_userdata($sesi);
        }
        else {
            $data['data']= "";
            $data['status'] = "error";
        }
        echo json_encode($data);
    }
    public function logout() {
        $this->session->sess_destroy();
        redirect(base_url());
    }

    public function error_page() {
        $this->load->view('errors/html/error_404');
    }
}