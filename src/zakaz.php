<?php
if (isset($_POST['form-name']) && isset($_POST['form-phone'])) {
    $name = stripslashes(htmlspecialchars($_POST['form-name']));
    $phone = stripslashes(htmlspecialchars($_POST['form-phone']));
    $productType = stripslashes(htmlspecialchars($_POST['form-producttype']));
    $productSymbol = stripslashes(htmlspecialchars($_POST['form-productsymbol']));
    if( $productType === 'Чашка') {
        $productColor = stripslashes(htmlspecialchars($_POST['form-productcolor']));
    }
    $productStyle = stripslashes(htmlspecialchars($_POST['form-productstyle']));
    $productName = stripslashes(htmlspecialchars($_POST['form-productname']));
    $productWish = stripslashes(htmlspecialchars($_POST['form-productwish']));
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="favicon.ico" type="image/ico">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Купить на подарок сувенир с нанесением или гравировкой любой тематики. Другу, Подруге, Родственнику, Сотруднику. ☎ +38 098 648 00 22, +38 095 648 00 22">
    <title>Оформление заказа</title>
    </head>
    <body>
        <?php
        $sendto   = "info@format.dp.ua";
        $subject  = "Поступил заказ на ".$productType." с сайта podarok.format.dp.ua";
        $headers  = "From: info@format.dp.ua\r\n";
        $headers .= "Reply-To: info@format.dp.ua\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain;charset=utf-8 \r\n";
        $msg = "-----------------------------------------------------------\r\n";
        $msg .= "ИНФОРМАЦИЯ О ЗАКАЗЕ\r\n";
        $msg .= "-----------------------------------------------------------\r\n";
        $msg .= "Поступил заказ на ".$productType."\r\n";
        $msg .= "Наносимый символ: ".$productSymbol."\r\n";
        if( $productType === 'Чашка') {
            $msg .= "Цвет: ".$productColor."\r\n";
        }
        $msg .= "Стиль: ".$productStyle."\r\n";
        $msg .= "\r\n";
        $msg .= "-----------------------------------------------------------\r\n";
        $msg .= "ИНФОРМАЦИЯ О КЛИЕНТЕ\r\n";
        $msg .= "-----------------------------------------------------------\r\n";
        $msg .= "От кого: ".$name."\r\n";
        $msg .= "Номер телефона: ".$phone."\r\n";

        // отправка сообщения
        if(@mail($sendto, $subject, $msg, $headers)) {
        ?>
            <div class="message-success">
                <img src="images/format-main-logo.svg" alt="РА Формат">
                <h1>Спасибо! Ваше сообщение успешно отправлено.</h1>
                <p>Наши менеджеры обязательно свяжутся с Вами и ответят на все Ваши вопросы.</p>
                <p>Смотрите еще больше интересного на <a href="https://format.dp.ua/">нашем сайте</a></p>
            </div>
        <?php
        } else {
            echo "Возникла проблема с отправкой формы";
        }
        ?>
    </body>
</html>
<?php } else {
    echo("Форма не заполнена корректно");
}
?>