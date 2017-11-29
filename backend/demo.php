<?php
include 'db.class.php';

$fields = array(
    'user_name','record_date','out_time','back_time','car','remark'
);
$data = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if ($_POST['user_name']) {
        $data['user_name'] = $_POST['user_name'];
    }
    if ($_POST['record_date']) {
        $data['record_date'] = $_POST['record_date'];
    }
    if ($_POST['out_time']) {
        $data['out_time'] = $_POST['out_time'];
    }
    if ($_POST['back_time']) {
        $data['back_time'] = $_POST['back_time'];
    }
    if ($_POST['car']) {
        $data['car'] = $_POST['car'];
    }
    if ($_POST['remark']) {
        $data['remark'] = $_POST['remark'];
    }

    $db = DB::getIntance();
    $data['create_date'] = date('Y-m-d H:i:s', time());
    $res = $db->insert('qxj_out_record',$data);
    return $res;
}





