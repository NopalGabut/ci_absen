<?php 
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=".$filename.".xls");
header("Pragma: no-cache");
header("Expires: 0");  ?>

<h1>Data Table Employee</h1>

<h4>Tanggal : <?= date('Y-m-d H:i:s'); ?> </h4>

<table border="1">
    <thead>
        <tr>
            <th>Branch Name</th>
            <th>Employee Code</th>
            <th>Employee Name</th>
            <th>Bpjs Name</th>
            <th>Bank Name</th>
        </tr>
    </thead>
    <tbody>
        <?php if (!empty($data)):?>
            <?php foreach ($data as $row): ?>
                <tr>
                    <td><?= $row['branchName']; ?></td>
                    <td><?= $row['employeeCode']; ?></td>
                    <td><?= $row['employeeName']; ?></td>
                    <td><?= $row['bpjsName']; ?></td>
                    <td><?= $row['bankName']; ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else: ?>
            <tr>
                <td colspan="3">No data available</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>