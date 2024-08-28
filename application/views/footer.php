<script src="assets/static/js/components/dark.js"></script>
    <script src="assets/extensions/perfect-scrollbar/perfect-scrollbar.min.js"></script>


    <script src="assets/compiled/js/app.js"></script>



    <!-- Need: Apexcharts -->
    <script src="assets/extensions/apexcharts/apexcharts.min.js"></script>
    <script src="assets/static/js/pages/dashboard.js"></script>

    <!-- Choices -->
    <script src="assets/extensions/choices.js/public/assets/scripts/choices.js"></script>
    <script src="assets/static/js/pages/form-element-select.js"></script>
    <script src="assets/extensions/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.js"></script>
    <script src="assets/extensions/jquery.dataTables.min.js"></script>
    <script src="assets/js/dataTables.bootstrap5.min.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>var base_url='<?php echo base_url();?>'</script>
    <?php if(isset($js)){ ?>
       <script src="<?php echo base_url('app/'.$js.'.js');?>"></script> 
    <?php } ?>
    
</body>

</html>