<?php
session_start();

$correct_user = "Kareem_Ryad_M";
$correct_pass = "@@2007@@";

$username = $_POST['username'];
$password = $_POST['password'];

if ($username === $correct_user && $password === $correct_pass) {
    $_SESSION['admin'] = true;
    header("Location: admin.php");
    exit;
} else {
    echo "<script>alert('بيانات الدخول غير صحيحة');window.location='login.html';</script>";
}
?>
