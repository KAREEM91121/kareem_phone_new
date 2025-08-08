
<?php
session_start();
if (!isset($_SESSION['admin'])) header('Location: login.php');
include 'config.php';

$name = $_POST['name'];
$price = $_POST['price'];
$category = $_POST['category'];
$screen = $_POST['screen'];
$battery = $_POST['battery'];
$camera = $_POST['camera'];
$system = $_POST['system'];
$extra = $_POST['extra'];

$image_name = basename($_FILES['image']['name']);
$image_path = 'uploads/' . $image_name;
move_uploaded_file($_FILES['image']['tmp_name'], $image_path);

// توليد ملف HTML
$html = "<!DOCTYPE html>
<html lang='ar' dir='rtl'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<title>$name</title>
<style>
body { font-family: 'Cairo', sans-serif; background: #111; color: white; padding: 20px; text-align: center; }
img { width: 300px; border-radius: 15px; }
.card { background: #222; padding: 20px; border-radius: 10px; margin: 10px auto; width: 90%; max-width: 400px; }
button { padding: 10px 20px; background: orange; border: none; color: white; border-radius: 5px; cursor: pointer; }
</style>
</head>
<body>
<img src='../$image_path' alt='$name'>
<h2>$name</h2>
<div class='card'><strong>السعر:</strong> $price د.ع</div>
<div class='card'><strong>الشاشة:</strong> $screen</div>
<div class='card'><strong>البطارية:</strong> $battery</div>
<div class='card'><strong>الكاميرا:</strong> $camera</div>
<div class='card'><strong>النظام:</strong> $system</div>
<div class='card'><strong>أخرى:</strong> $extra</div>
<br>
<a href='../index.html'><button>🔙 العودة</button></a>
<a href='../cart.html'><button>🛒 أضف إلى السلة</button></a>
</body></html>";

file_put_contents("products/" . str_replace(' ', '_', $name) . ".html", $html);
echo "<h3>✅ تم إضافة المنتج وتوليد الصفحة.</h3><a href='add_product.php'>⬅️ إضافة منتج آخر</a>";
?>
