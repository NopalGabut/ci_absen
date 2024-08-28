<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Employment extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model(array('m_department', 'm_employment'));
    }

    public function index()
    {
        $data['title'] = 'Employment';
        $data['employment'] = $this->m_employment->get_employment_data();
        $data['js'] = 'employment';

        $this->load->view('header', $data);
        $this->load->view('employment/v_employment', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['employment'] = $this->m_employment->get_employment_data();
        echo json_encode($data);
    }

    public function loadDepartment() 
    {
        if($this->input->post('id')>0){
            $res['data_atasan'] = $this->m_employment->get_emp_data($this->input->post('id'));
        }else{
            $res['data_department'] = $this->m_department->get_department_data();
        }
        
        

        echo json_encode($res);
    }

    public function create()
    {
        if ($this->input->post('txcode') != '') {

            $department = $this->input->post('txdepartment');
            $atasan = $this->input->post('txatasan');
            $kode = $this->input->post('txcode');
            $nama = $this->input->post('txnama');


            $query = $this->db->query("SELECT COUNT(*) as count FROM employment WHERE employmentCode = '{$kode}'");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$kode} sudah terpakai";
            } else {
                $sql = "INSERT INTO employment ( employmentDepartmentId, employmentParentEmploymentId, employmentCode, employmentName) VALUES ('{$department}','{$atasan}','{$kode}','{$nama}')";
                $exc = $this->db->query($sql);

                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$nama} berhasil";

                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$nama} gagal";
                }
            }
            echo json_encode($res);
        }
    }

    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM employment WHERE employmentId = ?", array($id));
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

    public function update_table()
    {
        $id = $this->input->post('id');
        $employmentCode = $this->input->post('employmentCode');
        $employmentName = $this->input->post('employmentName');
        $employmentDepartmentId = $this->input->post('employmentDepartmentId');
        $employmentParentEmploymentId = $this->input->post('employmentParentEmploymentId');
        

        $this->db->where('employmentCode', $employmentCode);
        $this->db->where('employmentDelete', 0);
        $this->db->where('employmentId !=', $id); 
        $query_code = $this->db->get('employment');

        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Kode sudah digunakan oleh data lain";
        } else {
            $this->db->where('employmentId', $id);
            $update_data = array(
                'employmentCode' => $employmentCode,
                'employmentName' => $employmentName,
                'employmentDepartmentId' => $employmentDepartmentId,
                'employmentParentEmploymentId' => $employmentParentEmploymentId
            );

            if ($this->db->update('employment', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }

        echo json_encode($res);
    }
    public function delete_table()
    {
        $id = $this->input->post("id");
        $employmentName = $this->input->post('employmentName');
        $this->db->where('employmentParentEmploymentId', $id);
        $this->db->where('employmentDelete !=', 1);
        $query = $this->db->get('employment');

        if ($query->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Data {$employmentName} sudah digunakan sebagai atasan";
        } else {
            if ($this->m_employment->delete_table($id)) {
                $res['status'] = 'success';
                $res['msg'] = "Data {$employmentName} berhasil di hapus";
            } else {
                $res['status'] = 'error';
                $res['msg'] = 'Gagal menghapus data';
            }
        }
        echo json_encode($res);
    }

    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_employment->active_data($id)) {
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