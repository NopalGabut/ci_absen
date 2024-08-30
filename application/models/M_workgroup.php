<?php
class M_workgroup extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_workgroup_data() {
        $sql = "SELECT * FROM workgroup WHERE workgroupDelete=0 order by workgroupId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function delete_workgroup ($id) {
        $sql = "UPDATE workgroup SET workgroupDelete = 1 WHERE workgroupId='$id'";
        return $this->db->query($sql);
    }

    public function active_data($id) {
        $sql = "UPDATE workgroup SET workgroupActive = if(workgroupActive = 1, 0, 1) WHERE workgroupId='$id'";
        return $this->db->query($sql);
    }
}