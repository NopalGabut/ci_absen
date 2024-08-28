<?php
class M_kantor extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_kantor($data) {
        return $this->db->insert('kantor', $data);
    }

    public function get_kantor_data() {
        $sql = "SELECT * FROM branch WHERE branchDelete=0 order by branchId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function delete_kantor($id) {
        $sql = "UPDATE branch SET branchDelete = 1 WHERE branchId='$id'";
        return $this->db->query($sql);
    }

    public function active_data($id) {
        $sql = "UPDATE branch SET branchActive = if(branchActive = 1, 0, 1) WHERE branchId='$id'";
        return $this->db->query($sql);
    }
    public function pusat_data($id){
        $sql = "UPDATE branch SET branchIsCenter = 0 WHERE branchIsCenter = 1";
        $this->db->query($sql);
        $sql = "UPDATE branch SET branchIsCenter = 1 WHERE branchId = '$id'";
        $this->db->query($sql, array($id));
        return $this->db->query($sql);
    }   
}