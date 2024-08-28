<?php
class M_golongan extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_golongan_data() {
        $sql = "SELECT * FROM levelgroup WHERE levelgroupDelete=0 order by levelgroupId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function delete_golongan ($id) {
        $sql = "UPDATE levelgroup SET levelgroupDelete = 1 WHERE levelgroupId='$id'";
        return $this->db->query($sql);
    }

    public function active_data($id) {
        $sql = "UPDATE levelgroup SET levelgroupActive = if(levelgroupActive = 1, 0, 1) WHERE levelgroupId='$id'";
        return $this->db->query($sql);
    }
}