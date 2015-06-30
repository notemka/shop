<?php 
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

// header("Content-Type: application/json");

	$name = $_POST['name'];
	$telephone = $_POST['phone'];
	$day = $_POST['day'];
	$month = $_POST['month'];
	$comment = $_POST['comment'];


	if(!$name || !$tel || !$day || !$month || !$comment) {
		$data['message'] = 'Заполните все поля';	
	} else {	
	 require_once '../libs/phpmailer/PHPMailerAutoload.php';
	        $mail = new PHPMailer();
	        $mail->isSMTP();
	        $mail->Host = 'smtp.yandex.ru';
	        $mail->SMTPAuth = true;
	        $mail->Username = 'majya-mail@yandex.ru';
	        $mail->Password = '59emZFH8IjnOrRw';
	        $mail->SMTPSecure = 'ssl';
	        $mail->Port = 465;
	        $mail->CharSet = 'UTF-8';
	        $mail->From = 'user-email';
	        $mail->FromName = 'Пользователь';
	        $mail->addAddress('emma.saitgaraeva@gmail.com', 'Эмме Хайруллиной');
	        $mail->WordWrap = 60;
	        $mail->Subject = 'Сообщение с сайта эппл shop';
	        $mail->Body = 'Телефон:'. $telephone.'<br>'. 'Коментарий:'. $comment;
		        if($mail->send()){
					$data['message'] = 'OK';
		        } else {
		            $data['message'] = "ERROR";
		        }
	}
	echo json_encode($data);
	exit;

}
?>