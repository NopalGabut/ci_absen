<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kantor extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_kantor');
    }

    public function index()
    {
        $data['title'] = 'Kantor';
        $data['kantor'] = $this->m_kantor->get_kantor_data();
        $data['js'] = 'Kantor';

        $this->load->view('header', $data);
        $this->load->view('kantor/v_kantor', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['kantor'] = $this->m_kantor->get_kantor_data();
        echo json_encode($data);
    }
    public function delete()
    {
        $id = $this->input->post('id');
        if ($this->m_kantor->delete_kantor($id)) {
            $res['status'] = 'success';
            $res['msg'] = "Data kantor berhasil dihapus!";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal menghapus data kantor.";
        }
        echo json_encode($res);
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM branch WHERE branchId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            /*$sql = $this->db->query("UPDATE bank SET bankBill = ? WHERE bankBill = ?", array($id, $id));
            if ($sql) {
                $res['status'] = 'success';
                $res['msg'] = "Data {$id} berhasil diupdate";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Data Gagal di update";
            }*/
            $res['status'] = 'error';
            $res['msg'] = "Data tidak ditemukan";
        }
        echo json_encode($res);
    }
    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_kantor->active_data($id)) {
            $res["status"] = "success";
            $ket = ($status == 1) ? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil " . $ket;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data Gagal dinonaktifkan";
        }
        echo json_encode($res);
    }

    public function create()
    {
        if ($this->input->post('txkode') != '') {
            $code = $this->input->post('txkode');
            $name = $this->input->post('txid');
            $email = $this->input->post('txemail');
            $telp = $this->input->post('txtelp');
            $region = $this->input->post('txregion');
            $city = $this->input->post('txkota');
            $address = $this->input->post('txalamat');

            $query = $this->db->query("SELECT COUNT(*) as count FROM branch WHERE branchCode = '{$code}' OR branchEmail ='{$email}' OR branchTelp ='{$telp}' ");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code}/Email {$email}/No.Telephone {$telp} sudah terpakai";
            } else {
                $sql = "INSERT INTO branch (branchClientId,branchManagerEmployeeId,branchIsCenter,branchCode, branchName, branchEmail, branchTelp, branchRegion, branchCity, branchAddress, branchActive) VALUES (1,0,0,'{$code}','{$name}', '{$email}' ,'{$telp}','{$region}' ,'{$city}' ,'{$address}' , 1)";
                $exc = $this->db->query($sql);

                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$name} berhasil";
                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$name} gagal";
                }
            }
            echo json_encode($res);
        }
    }

    public function update_table()
    {
        $id = $this->input->post('id');
        $branchCode = $this->input->post('branchCode');
        $branchName = $this->input->post('branchName');
        $branchEmail = $this->input->post('branchEmail');
        $branchTelp = $this->input->post('branchTelp');
        $branchRegion = $this->input->post('branchRegion');
        $branchCity = $this->input->post('branchCity');
        $branchAddress = $this->input->post('branchAddress');

        $this->db->where('branchCode', $branchCode);
        $this->db->where('branchDelete', 0);        
        $this->db->where_not_in('branchId', $id);
        $query_code = $this->db->get('branch');
    
        $this->db->where('branchEmail', $branchEmail);
        $this->db->where('branchDelete', 0);        
        $this->db->where_not_in('branchId', $id);
        $query_email = $this->db->get('branch');
    
        $this->db->where('branchTelp', $branchTelp);
        $this->db->where('branchDelete', 0);        
        $this->db->where_not_in('branchId', $id);
        $query_telp = $this->db->get('branch');

        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Kode cabang sudah digunakan oleh data lain";
        } elseif ($query_email->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Email cabang sudah digunakan oleh data lain";
        } elseif ($query_telp->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Telepon cabang sudah digunakan oleh data lain";
        } else {
            $this->db->where('branchId', $id);
            $update_data = array(
                'branchCode' => $branchCode,
                'branchName' => $branchName,
                'branchEmail' => $branchEmail,
                'branchTelp' => $branchTelp,
                'branchRegion' => $branchRegion,
                'branchCity' => $branchCity,
                'branchAddress' => $branchAddress);

            if ($this->db->update('branch', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }

        echo json_encode($res);
    }
    public function pusat()
    {
        $id = $this->input->post("id");
        $pusat = $this->input->post("pusat");
        if ($this->m_kantor->pusat_data($id)) {
            $res["pusat"] = "success";
            $ket = ($pusat == 1) ? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil " . $ket;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data Gagal ";
        }
        echo json_encode($res);
    }
}
