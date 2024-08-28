<?php
class M_bpjs extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_bpjs($data) {
        return $this->db->insert('bpjs', $data);
    }

    public function get_bpjs_data() {
        $sql = "SELECT * FROM bpjs WHERE bpjsDelete=0 order by bpjsId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function delete_bpjs($id) {
        $sql = "UPDATE bpjs SET bpjsDelete = 1 WHERE bpjsId='$id'";
        return $this->db->query($sql);
    }

    public function active_data($id) {
        $sql = "UPDATE bpjs SET bpjsActive = if(bpjsActive = 1, 0, 1) WHERE bpjsId='$id'";
        return $this->db->query($sql);
    }
}