<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Employee extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model(array('m_employee', 'm_kantor', 'm_bank', 'm_bpjs', 'm_insurance'));
    }

    public function index()
    {
        $data['title'] = 'Employee';
        $data['employee'] = $this->m_employee->get_employee_data();
        $data['js'] = 'employee';

        $this->load->view('header', $data);
        $this->load->view('employee/v_employee', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['employee'] = $this->m_employee->get_employee_data();
        echo json_encode($data);
    }

    function valid_info()
    {
        $nama = $this->input->post('val');
        $x = $this->input->post('x');
        $result = null;

        if ($nama != '') {
            if ($x == 1) {
                $query_nama = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeName = '{$nama}'");
                $result = $query_nama->row();
                $ket = 'nama';
            } else if ($x == 2) {
                $query_kode = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeCode = '{$nama}'");
                $result = $query_kode->row();
                $ket = 'code';
            } else if ($x == 3) {
                $query_email = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeEmail = '{$nama}'");
                $result = $query_email->row();
                $ket = 'email';
            } else if ($x == 4) {
                $query_ktp = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeKtp = '{$nama}'");
                $result = $query_ktp->row();
                $ket = 'no KTP';
            } else if ($x == 5) {
                $query_rek = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeBill = '{$nama}'");
                $result = $query_rek->row();
                $ket = 'no rekening';
            } else if ($x == 6) {
                $query_bpjs = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeBpjsNo = '{$nama}'");
                $result = $query_bpjs->row();
                $ket = 'no BPJS';
            } else if ($x == 7) {
                $query_npwp = $this->db->query("SELECT COUNT(*) as count FROM employee WHERE employeeNpwp = '{$nama}'");
                $result = $query_npwp->row();
                $ket = 'no NPWP';
            }
        }

        if ($result && $result->count > 0) {
            $res['status'] = 'error';
            $res['msg'] = $ket . " {$nama} sudah terpakai";
            echo json_encode($res);
        }
    }

    function load_cabang()
    {
        $res['data_kantor'] = $this->m_kantor->get_kantor_data();
        $res['data_bank'] = $this->m_bank->get_bank_data();
        $res['data_bpjs'] = $this->m_bpjs->get_bpjs_data();
        $res['data_insurance'] = $this->m_insurance->get_insurance_data();
        echo json_encode($res);
    }

    public function simpan_data()
    {
        $res['cabang'] = $this->input->post('cabang');
        $res['bank'] = $this->input->post('bank');
        $res['nama'] = $this->input->post('nama');
        $res['namalkp'] = $this->input->post('namalkp');
        $res['kode'] = $this->input->post('kode');
        $res['email'] = $this->input->post('email');
        $res['ktp'] = $this->input->post('ktp');
        $res['gender'] = $this->input->post('gender');
        $res['golongan'] = $this->input->post('golongan');
        $res['namaibu'] = $this->input->post('namaibu');
        $res['agama'] = $this->input->post('agama');
        $res['kebangsaan'] = $this->input->post('kebangsaan');
        $res['rekening'] = $this->input->post('rekening');
        $res['gaji'] = $this->input->post('gaji');
        $res['bpjs'] = $this->input->post('bpjs');
        $res['nobpjs'] = $this->input->post('nobpjs');
        $res['npwp'] = $this->input->post('npwp');
        $res['foto'] = $_FILES['foto']['name'];
        $res['tglmasuk'] = $this->input->post('tglmasuk');
        $res['tglaktif'] = $this->input->post('tglaktif');
        $res['tglkeluar'] = $this->input->post('tglkeluar');
        $alamat = json_decode($this->input->post('alamat'), true);
        $asuransi = json_decode($this->input->post('asuransi'), true);
        $kontak = json_decode($this->input->post('kontak'), true);
        $pendidikan = json_decode($this->input->post('pendidikan'), true);

        $path = $this->upload('foto', 'img-' . time());

        $employee_data = array(
            'employeeClientId' => 0,
            'employeeBranchId' => $res['cabang'],
            'employeeBankId' => $res['bank'],
            'employeeName' => $res['nama'],
            'employeeFullname' => $res['namalkp'],
            'employeeCode' => $res['kode'],
            'employeeEmail' => $res['email'],
            'employeeKtp' => $res['ktp'],
            'employeeGender' => $res['gender'],
            'employeeBlood' => $res['golongan'],
            'employeeMother' => $res['namaibu'],
            'employeeReligion' => $res['agama'],
            'employeeNation' => $res['kebangsaan'],
            'employeeBill' => $res['rekening'],
            'employeeSalaryType' => $res['gaji'],
            'employeeBpjsId' => $res['bpjs'],
            'employeeBpjsNo' => $res['nobpjs'],
            'employeeNpwp' => $res['npwp'],
            'employeePhoto' => $path,
            'employeeInDate' => $res['tglmasuk'],
            'employeeActiveDate' => $res['tglaktif'],
            'employeeOutDate' => $res['tglkeluar'],
            'employeeActive' => 1
        );

        $this->db->insert('employee', $employee_data);
        $employee_id = $this->db->insert_id();

        if (count($alamat) > 0) {
            foreach ($alamat as $addr) {
                $addr['empladdressEmployeeId'] = $employee_id;
                $this->db->insert('empladdress', $addr);
            }
        }


        if (count($asuransi) > 0) {
            foreach ($asuransi as $ins) {
                $ins['emplinsuranceEmployeeId'] = $employee_id;
                $this->db->insert('emplinsurance', $ins);
            }
        }


        if (count($kontak) > 0) {
            foreach ($kontak as $con) {
                $con['emplcontactEmployeeId'] = $employee_id;
                $this->db->insert('emplcontact', $con);
            }
        }

        if (count($pendidikan) > 0) {
            foreach ($pendidikan as $edu) {
                $edu['empleduEmployeeId'] = $employee_id;
                $this->db->insert('empledu', $edu);
            }
        }

        if ($employee_id) {
            $res['status'] = 'success';
            $res['msg'] = "Simpan data berhasil";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Simpan data gagal";
        }

        echo json_encode(array($res, 'employee_id' => $employee_id));
    }

    function upload($field, $filename)
    {
        $this->load->library('upload');
        $config['upload_path'] = './uploads/employee';
        if (!is_dir($config['upload_path'])) {
            mkdir($config['upload_path'], 0777, TRUE);
        }
        $config['allowed_types'] = '*';
        $config['file_name'] = $filename;
        $path = substr($config['upload_path'], 1);
        $this->upload->initialize($config);
        if ($this->upload->do_upload($field)) {
            $this->img_resize('.' . $path . '/' . $this->upload->data('file_name'));
            return $path . '/' . $this->upload->data('file_name');
        } else {
            return null;
        }
    }

    function img_resize($file)
    {
        $config['image_library']  = 'gd2';
        $config['source_image']   = $file;
        $config['create_thumb']   = FALSE;
        $config['quality']        = '70%';
        $config['width']          = '315';
        $config['height']         = '1';
        $config['maintain_ratio'] = TRUE;
        $config['master_dim']     = 'width';
        $config['new_image']      = $file;
        $this->load->library('image_lib', $config);
        $done = $this->image_lib->resize();
        $this->image_lib->clear();
        return $done;
    }

    public function delete()
    {
        $id = $this->input->post('id');
        if ($this->m_employee->delete_m($id)) {
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
        if ($this->m_employee->active_data($id)) {
            $res["status"] = "success";
            $ket = ($status == 1) ? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil " . $ket;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data Gagal dinonaktifkan";
        }
        echo json_encode($res);
    }

    public function edit_table()
    {
        $id = $this->input->post('id');
        $employee = $this->db->query("SELECT * FROM employee WHERE employeeId = ?", array($id))->row_array();
        $address = $this->db->query("SELECT * FROM empladdress WHERE empladdressDelete = 0 and empladdressEmployeeId = ?", array($id))->result_array();
        $insurance = $this->db->query("SELECT * FROM emplinsurance WHERE emplinsuranceDelete = 0 and emplinsuranceEmployeeId = ?", array($id))->result_array();
        $contact = $this->db->query("SELECT * FROM emplcontact WHERE emplcontactDelete = 0 and emplcontactEmployeeId = ?", array($id))->result_array();
        $education = $this->db->query("SELECT * FROM empledu WHERE empleduDelete = 0 and empleduEmployeeId = ?", array($id))->result_array();

        if ($employee) {
            $res['status'] = 'ok';
            $res['data'] = [
                'employee' => $employee,
                'address' => $address ?: null,
                'insurance' => $insurance ?: null,
                'contact' => $contact ?: null,
                'education' => $education ?: null,
            ];
            $res['msg'] = "Data {$id} found";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Code {$id} not found";
        }

        echo json_encode($res);
    }

    public function update()
    {
        $id = $this->input->post('id');
        $alamat = json_decode($this->input->post('empladdress'), true);
        $asuransi = json_decode($this->input->post('emplinsuranse'), true);
        $kontak = json_decode($this->input->post('emplcontact'), true);
        $pendidikan = json_decode($this->input->post('empledu'), true);

        $employeeData = array(
            'employeeBranchId' => $this->input->post('employeeBranchId'),
            'employeeBankId' => $this->input->post('employeeBankId'),
            'employeeName' => $this->input->post('employeeName'),
            'employeeFullname' => $this->input->post('employeeFullname'),
            'employeeCode' => $this->input->post('employeeCode'),
            'employeeEmail' => $this->input->post('employeeEmail'),
            'employeeKtp' => $this->input->post('employeeKtp'),
            'employeeGender' => $this->input->post('employeeGender'),
            'employeeBlood' => $this->input->post('employeeBlood'),
            'employeeMother' => $this->input->post('employeeMother'),
            'employeeReligion' => $this->input->post('employeeReligion'),
            'employeeNation' => $this->input->post('employeeNation'),
            'employeeBill' => $this->input->post('employeeBill'),
            'employeeSalaryType' => $this->input->post('employeeSalaryType'),
            'employeeBpjsId' => $this->input->post('employeeBpjsId'),
            'employeeBpjsNo' => $this->input->post('employeeBpjsNo'),
            'employeeNpwp' => $this->input->post('employeeNpwp'),
            'employeeInDate' => $this->input->post('employeeInDate'),
            'employeeActiveDate' => $this->input->post('employeeActiveDate'),
            'employeeOutDate' => $this->input->post('employeeOutDate'),
        );

        $this->db->where('employeeId', $id);
        if ($this->db->update('employee', $employeeData)) {
            $employee_id = $id;

            if (is_array($alamat)) {
                $sql = "UPDATE empladdress SET empladdressDelete = 1 WHERE empladdressEmployeeId = $employee_id";
                $this->db->query($sql);
                foreach ($alamat as $addr) {
                    $l_col['empladdressEmployeeId'] = $employee_id;
                    $l_col['empladdressJalan'] = $addr['empladdressJalan'];
                    $l_col['empladdressKecamatan'] = $addr['empladdressKecamatan'];
                    $l_col['empladdressKelurahan'] = $addr['empladdressKelurahan'];
                    $l_col['empladdressKota'] = $addr['empladdressKota'];
                    $l_col['empladdressPhone'] = $addr['empladdressPhone'];
                    $l_col['empladdressProvinsi'] = $addr['empladdressProvinsi'];
                    $this->db->insert('empladdress', $l_col);
                }
                // foreach ($alamat as $addr) {
                //     $addr['empladdressEmployeeId'] = $employee_id;
                //     if (isset($addr['empladdressId'])) {
                //         $this->db->where('empladdressId', $addr['empladdressId']);
                //         $this->db->update('empladdress', $addr);
                //     }
                // }
            }

            if (is_array($asuransi)) {
                $sql = "UPDATE emplinsurance SET emplinsuranceDelete = 1 WHERE emplinsuranceEmployeeId = $employee_id";
                $this->db->query($sql);
                foreach ($asuransi as $ins) {
                    $s_col['emplinsuranceEmployeeId'] = $employee_id;
                    $s_col['emplinsuranceBpjsId'] = $ins['emplinsuranceBpjsId'];
                    $s_col['emplinsuranceNo'] = $ins['emplinsuranceNo'];
                    $this->db->insert('emplinsurance', $s_col);
                }
                // foreach ($asuransi as $ins) {
                //     $ins['emplinsuranceEmployeeId'] = $employee_id;
                //     if (isset($ins['emplinsuranceId'])) {
                //         $this->db->where('emplinsuranceId', $ins['emplinsuranceId']);
                //         $this->db->update('emplinsurance', $ins);
                //     }
                // }
            }

            if (is_array($kontak)) {
                $sql = "UPDATE emplcontact SET emplcontactDelete = 1 WHERE emplcontactEmployeeId = $employee_id";
                $this->db->query($sql);
                foreach ($kontak as $con) {
                    $a_col['emplcontactEmployeeId'] = $employee_id;
                    $a_col['emplcontactName'] = $con['emplcontactName'];
                    $a_col['emplcontactAddress'] = $con['emplcontactAddress'];
                    $a_col['emplcontactProfesion'] = $con['emplcontactProfesion'];
                    $a_col['emplcontactHubungan'] = $con['emplcontactHubungan'];
                    $a_col['emplcontactPhone'] = $con['emplcontactPhone'];
                    $this->db->insert('emplcontact', $a_col);
                }
                // foreach ($kontak as $con) {
                //     $con['emplcontactEmployeeId'] = $employee_id;
                //     if (isset($con['emplcontactId'])) {
                //         $this->db->where('emplcontactId', $con['emplcontactId']);
                //         $this->db->update('emplcontact', $con);
                //     }
                // }
            }

            if (is_array($pendidikan)) {
                $sql = "UPDATE empledu SET empleduDelete = 1 WHERE empleduEmployeeId = $employee_id";
                $this->db->query($sql);
                foreach ($pendidikan as $edu) {
                    $e_col['empleduEmployeeId'] = $employee_id;
                    $e_col['empleduJenjang'] = $edu['empleduJenjang'];
                    $e_col['empleduInstansi'] = $edu['empleduInstansi'];
                    $e_col['empleduJurusan'] = $edu['empleduJurusan'];
                    $e_col['empleduTahunlulus'] = $edu['empleduTahunlulus'];
                    $this->db->insert('empledu', $e_col);
                }
            }

            $res['status'] = 'success';
            $res['msg'] = "Data berhasil diperbarui";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal memperbarui data";
        }

        echo json_encode($res);
    }

    function tgl_excel($tg)
    {
        $unix_date = ($tg - 25569) * 86400;
        $tg = 25569 + ($unix_date / 86400);
        $unix_date = ($tg - 25569) * 86400;
        $tgl = gmdate("Y-m-d", $unix_date);
        return $tgl;
    }

    function import_excel()
    {
        if (isset($_FILES["file"])) {
            //-- upload file excel ke folder temporary
            $rand             = rand();
            $path_part        = pathinfo($_FILES["file"]["name"]);
            $ext            = $path_part["extension"];
            $filename        = "inject_" . $rand . "." . $ext;

            $config['upload_path']       = "tmp/xls/";
            $config['allowed_types']     = '*';
            $config['file_name']             = $filename;
            $this->load->library('upload', $config);
            $this->upload->do_upload('file');

            //-- lokasi file temporary
            $path_file     = "tmp/xls/" . $filename;
            //echo $path_file;
            //-- akses fungsi excel reader
            // require_once APPPATH.'third_party/excel/reader.php';
            // $data = new Spreadsheet_Excel_Reader();
            // $data->read($path_file);

            // //-- sheet 1 indexnya 0
            // $jmlbaris = $data->sheets[0]['numRows'];

            // //-- baca data dimulai dari cell A baris ke 2, baris 1 untuk judulnya
            // for ($i=2; $i<=$jmlbaris; $i++)
            // {
            // 	//-- baca data per kolom, misal kolom A berarti index 1
            // 	$dt = $data->sheets[0]['cells'][$i];

            // 	echo "Data cell A2 : ".$dt[1]."<br>";
            // 	echo "Data cell B2 : ".$dt[2]."<br>";
            // }
            error_reporting(0);
            $this->load->library(array('PHPExcel', 'PHPExcel/IOFactory'));
            try {
                $inputFileType  = IOFactory::identify($path_file);
                $objReader      = IOFactory::createReader($inputFileType);
                $objPHPExcel    = $objReader->load($path_file);
            } catch (Exception $e) {
                die('Error loading file "' . pathinfo($path_file, PATHINFO_BASENAME) . '": ' . $e->getMessage());
            }
            $sheet          = $objPHPExcel->getSheet(0);
            $highestRow     = $sheet->getHighestRow();
            $highestColumn  = $sheet->getHighestColumn();

            for ($row = 2; $row <= $highestRow; $row++) {
                $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
                if ($rowData) {
                    //echo $rowData[0][4];
                    $tglin = $this->tgl_excel($rowData[0][13]);
                    $tglout = $this->tgl_excel($rowData[0][14]);

                    $sql = "SELECT branchId FROM branch WHERE branchName = '{$rowData[0][0]}' and branchDelete = 0";
                    $branchId = $this->db->query($sql)->row()->branchId;
                    $sql = "SELECT bankId FROM bank WHERE bankName = '{$rowData[0][1]}' and bankDelete = 0";
                    $bankId = $this->db->query($sql)->row()->bankId;
                    $sql = "SELECT bpjsId FROM bpjs WHERE bpjsName = '{$rowData[0][22]}' and bpjsDelete = 0";
                    $bpjsId = $this->db->query($sql)->row()->bpjsId;

                    $dataEmployee = array(
                        'employeeClientId' => 0,
                        'employeeBranchId' => $branchId,
                        'employeeBankId' => $bankId,
                        'employeeName' => $rowData[0][3],
                        'employeeFullname' => $rowData[0][4],
                        'employeeCode' => $rowData[0][2],
                        'employeeEmail' => $rowData[0][5],
                        'employeeKtp' => $rowData[0][6],
                        'employeeGender' => $rowData[0][7],
                        'employeeBlood' => $rowData[0][8],
                        'employeeMother' => $rowData[0][9],
                        'employeeReligion' => $rowData[0][10],
                        'employeeNation' => $rowData[0][11],
                        'employeeBill' => $rowData[0][12],
                        'employeeNpwp' => $rowData[0][15],
                        'employeeBpjsNo' => $rowData[0][23],
                        'employeeBpjsId' => $bpjsId,
                        'employeeInDate' => date('Y-m-d', strtotime($tglin)),
                        'employeeActiveDate' => date('Y-m-d', strtotime($tglout)),
                        'employeeActive' => 1,
                    );


                    $this->db->insert('employee', $dataEmployee);
                    $employee_id = $this->db->insert_id();


                    $sheet2          = $objPHPExcel->getSheet(1);
                    $highestRow2     = $sheet2->getHighestRow();
                    $highestColumn2  = $sheet2->getHighestColumn();
                    for ($row2 = 2; $row2 <= $highestRow2; $row2++) {

                        $rowData2 = $sheet2->rangeToArray('A' . $row2 . ':' . $highestColumn2 . $row2, NULL, TRUE, FALSE);
                        if ($rowData2) {
                            if ($rowData2[0][0] == $rowData[0][2]) {
                                $q_col['empladdressEmployeeId'] = $employee_id;
                                $q_col['empladdressJalan'] = $rowData2[0][1];
                                $q_col['empladdressKecamatan'] = $rowData2[0][2];
                                $q_col['empladdressKelurahan'] = $rowData2[0][3];
                                $q_col['empladdressKota'] = $rowData2[0][4];
                                $q_col['empladdressPhone'] = $rowData2[0][6];
                                $q_col['empladdressProvinsi'] = $rowData2[0][5];

                                $this->db->insert('empladdress', $q_col);
                            }
                        }
                    }

                    $sheet3          = $objPHPExcel->getSheet(2);
                    $highestRow3     = $sheet3->getHighestRow();
                    $highestColumn3  = $sheet3->getHighestColumn();
                    for ($row3 = 2; $row3 <= $highestRow3; $row3++) {

                        $rowData3 = $sheet3->rangeToArray('A' . $row3 . ':' . $highestColumn3 . $row3, NULL, TRUE, FALSE);
                        if ($rowData3) {
                            if ($rowData3[0][0] == $rowData[0][2]) {
                                $w_col['emplinsuranceEmployeeId'] = $employee_id;
                                $w_col['emplinsuranceBpjsId'] = $rowData3[0][1];
                                $w_col['emplinsuranceNo'] = $rowData3[0][2];
                                $this->db->insert('emplinsurance', $w_col);
                            }
                        }
                    }
                    $sheet4          = $objPHPExcel->getSheet(3);
                    $highestRow4     = $sheet4->getHighestRow();
                    $highestColumn4  = $sheet4->getHighestColumn();
                    for ($row4 = 2; $row4 <= $highestRow4; $row4++) {

                        $rowData4 = $sheet4->rangeToArray('A' . $row4 . ':' . $highestColumn4 . $row4, NULL, TRUE, FALSE);
                        if ($rowData4) {
                            if ($rowData4[0][0] == $rowData[0][2]) {
                                $e_col['emplcontactEmployeeId'] = $employee_id;
                                $e_col['emplcontactName'] = $rowData4[0][1];
                                $e_col['emplcontactAddress'] = $rowData4[0][2];
                                $e_col['emplcontactProfesion'] = $rowData4[0][3];
                                $e_col['emplcontactHubungan'] = $rowData4[0][4];
                                $e_col['emplcontactPhone'] = $rowData4[0][5];
                                $this->db->insert('emplcontact', $e_col);
                            }
                        }
                    }
                    $sheet5          = $objPHPExcel->getSheet(4);
                    $highestRow5     = $sheet5->getHighestRow();
                    $highestColumn5  = $sheet5->getHighestColumn();
                    for ($row5 = 2; $row5 <= $highestRow5; $row5++) {

                        $rowData5 = $sheet5->rangeToArray('A' . $row5 . ':' . $highestColumn5 . $row5, NULL, TRUE, FALSE);
                        if ($rowData5) {
                            if ($rowData5[0][0] == $rowData[0][2]) {
                                $r_col['empleduEmployeeId'] = $employee_id;
                                $r_col['empleduJenjang'] = $rowData5[0][1];
                                $r_col['empleduInstansi'] = $rowData5[0][2];
                                $r_col['empleduJurusan'] = $rowData5[0][3];
                                $r_col['empleduTahunlulus'] = $rowData5[0][4];
                                $this->db->insert('empledu', $r_col);
                            }
                        }
                    }

                    $res['status'] = 'success';
                    $res['msg'] = "Data berhasil ditambahkan";
                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Gagal menambahkan data";
                }
            }
            echo json_encode($res);
        }
    }
    public function exportExcel()
    {
        $sql = "SELECT branchName, employeeCode, employeeName, bankName, bpjsName from employee 
        join bpjs on bpjsId = employeeBpjsId and bpjsDelete = 0
        join bank on bankId = employeeBankId and bankDelete = 0
        join branch on branchId = employeeBranchId AND branchDelete = 0
        Where employeeDelete = 0 
        AND branchName <> ''
        AND bpjsName <> ''
        AND bankName <> ''

        ORDER BY employeeCode, employeeName ";
        $res['data'] = $this->db->query($sql)->result_array();
        $output = $this->load->view("employee/v_export_excel", $res, true);
        echo $output;
    }
}
