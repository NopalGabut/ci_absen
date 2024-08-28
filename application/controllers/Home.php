<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	
	 
	public function index()
	{
       //session_destroy();//
       if (isset($this->session->absen_login)) {
        $this->load->view('header');
        $this->load->view('home/v_index');
        $this->load->view('footer');
       }else {
        $this->load->view('errors/html/error_404');
       }
		
	}

    public function loadData() {
        echo 'Hello world';
    }

    public function LoadBaru() {
        echo 'garang asem';
    }
}
