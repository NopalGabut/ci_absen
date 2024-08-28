<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Insurance extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_insurance');
    }

    public function index()
    {
        $data['title'] = 'Insurance';
        $data['asuransi'] = $this->m_insurance->get_insurance_data();
        $data['js'] = 'insurance';

        $this->load->view('header', $data);
        $this->load->view('insurance/v_insurance', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['insurance'] = $this->m_insurance->get_insurance_data();
        echo json_encode($data);
    }

    public function create()
    {
        if ($this->input->post('txcode') != '') {
            $code = $this->input->post('txcode');
            $name = $this->input->post('txnama');
            $id = $this->input->post('txid');
            $jenis = $this->input->post('txjenis');
            $tagihan = $this->input->post('txtagihan');
            $potongan = $this->input->post('txpotongan');
            $perusahaan = $this->input->post('txperusahaan');
            $karyawan = $this->input->post('txkaryawan');
            

            $query = $this->db->query("SELECT COUNT(*) as count FROM insurance WHERE insuranceCode = '{$code}' OR insuranceNo ='{$id}'");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code}/No.Asuransi {$id} sudah terpakai";
            } else {
                // $sql = "INSERT INTO insurance (bpjsClientId, bpjsCode, bpjsName, bpjsClass, bpjsTotalBill, bpjsCompPercent, bpjsEmplPercent, bpjsActive) VALUES (1,'{$code}','{$name}', '{$kelas}' ,'{$premi}','{$perusahaan}' ,'{$karyawan}', 1)";
                $sql = "INSERT INTO insurance (insuranceCode, InsuranceName, InsuranceNo, InsuranceType, insuranceSalaryCut, insuranceTotalBill, insuranceCompPersen, insuranceEmplPersen, insuranceActive) VALUES ('{$code}','{$name}', '{$id}' ,'{$jenis}','{$potongan}','{$tagihan}','{$perusahaan}' ,'{$karyawan}', 1)";
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

    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM insurance WHERE insuranceId = ?", array($id));
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
        $insuranceCode = $this->input->post('insuranceCode');
        $insuranceName = $this->input->post('insuranceName');
        $insuranceNo = $this->input->post('InsuranceNo');
        $insuranceType = $this->input->post('InsuranceType');
        $insuranceTotalBill = $this->input->post('insuranceTotalBill');
        $insuranceSalaryCut = $this->input->post('InsuranceSalaryCut');
        $insuranceCompPersen = $this->input->post('insuranceCompPersen');
        $insuranceEmplPersen = $this->input->post('insuranceEmplPersen');

        // Periksa apakah kode sudah digunakan oleh data lain (kecuali data yang sedang diedit)
        $this->db->where('insuranceCode', $insuranceCode);
        $this->db->where('insuranceDelete', 0);
        $this->db->where('insuranceId !=', $id); // Pastikan untuk mengabaikan ID yang sedang diedit
        $query_code = $this->db->get('insurance');

        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Kode sudah digunakan oleh data lain";
        } else {
            $this->db->where('insuranceId', $id);
            $update_data = array(
                'insuranceCode' => $insuranceCode,
                'insuranceName' => $insuranceName,
                'insuranceNo' => $insuranceNo,
                'insuranceType' => $insuranceType,
                'insuranceTotalBill' => $insuranceTotalBill,
                'insuranceSalaryCut' => $insuranceSalaryCut,
                'insuranceCompPersen' => $insuranceCompPersen,
                'insuranceEmplPersen' => $insuranceEmplPersen
            );

            if ($this->db->update('insurance', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }

        echo json_encode($res);
    }

    
    public function delete()
    {
        $id = $this->input->post('id');
        if ($this->m_insurance->delete_insurance($id)) {
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
        if ($this->m_insurance->active_data($id)) {
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