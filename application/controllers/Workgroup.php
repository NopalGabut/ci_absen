<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Workgroup extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_workgroup');
    }

    public function index()
    {
        $data['title'] = 'Group Kerja';
        $data['workgroup'] = $this->m_workgroup->get_workgroup_data();
        $data['js'] = 'workgroup';

        $this->load->view('header', $data);
        $this->load->view('workgroup/v_workgroup', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['workgroup'] = $this->m_workgroup->get_workgroup_data();
        echo json_encode($data);
    }

    public function create()
    {
        if ($this->input->post('txnama') != '') {

            $name = $this->input->post('txnama');


            $sql = "INSERT INTO workgroup ( workgroupName, workgroupActive) VALUES 
            ('{$name}', 1)";
            $exc = $this->db->query($sql);
            if ($exc) {
                $res['status'] = 'success';
                $res['msg'] = "Simpan data {$name} berhasil";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Simpan data {$name} gagal";
            }
            echo json_encode($res);
        }
    }

    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM workgroup WHERE workgroupId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Data tidak ditemukan";
        }
        echo json_encode($res);
    }
    
    public function update_table() {
        $id = $this->input->post('id'); 
        $workgroupName = $this->input->post('workgroupName');
        
            $this->db->where('workgroupId', $id);
            $update_data = array(
                'workgroupName' => $workgroupName,
            );
    
            if ($this->db->update('workgroup', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
    
        echo json_encode($res);
    }
    public function delete_table()
    {
        $id = $this->input->post('id');
        if ($this->m_workgroup->delete_workgroup($id)) {
            $res['status'] = 'success';
            $res['msg'] = "Data kantor berhasil dihapus!";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal menghapus data kantor.";
        }
        echo json_encode($res);
    }
    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_workgroup->active_data($id)) {
            $res["status"] = "success";
            $ket = ($status == 1) ? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil " . $ket;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data Gagal dinonaktifkan";
        }
        echo json_encode($res);
    }
}