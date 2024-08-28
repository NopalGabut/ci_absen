<?php
class M_employment extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_employment_data()
    {
        $sql = "SELECT a.employmentId, a.employmentCode kode, ifnull(b.employmentName,'-') atasan, a.employmentName nama, departmentName, a.employmentActive
                from employment a
                left join employment b on b.employmentId = a.employmentParentEmploymentId
                join department on departmentId = a.employmentDepartmentId
                where a.employmentDelete=0 ";
        $query = $this->db->query($sql);

        return $query->result();
    }

    public function get_emp_data($id){
        $sql = "SELECT employmentId, employmentCode kode, employmentName atasan
                from employment 
                join department on departmentId = employmentDepartmentId
                where employmentDelete=0
                and employmentDepartmentId='{$id}'";
        $query = $this->db->query($sql);

        return $query->result();
    }
    
    // public function delete_employment($id){
    //     $sql = "SELECT employmentParentEmploymentId FROM employment WHERE employmentParentEmploymentId = '$id'";
    //     $ada = $this->db->query($sql)->num_rows();
    //     if ($ada > 0) {
    //         return 2;
    //     } else {
    //         $sql = "UPDATE employment SET employmentDelete = 1 WHERE employmentId = '$id'";
    //         $this->db->query($sql, array($id));
    //         return 1;
    //     }
    // }
        
    public function delete_employment($id) {
        $sql = "UPDATE employment SET employmentDelete = 1 WHERE employmentId = '$id'";
        return $this->db->query($sql, array($id));
    }
    

    public function active_data($id)
    {
        $sql = "UPDATE employment SET employmentActive = if(employmentActive = 1, 0, 1) WHERE employmentId='$id'";
        return $this->db->query($sql);
    }
}