<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>{{ APP_BUSSINESS_NAME }} | Tienda</title>
		<!-- SEO Meta Tags-->
		<meta name="description" content="{{ APP_BUSSINESS_NAME }} | Tienda">
		<meta name="keywords" content="indumentaria, ropa, vestidos, ropa interior, lenceria, bombachas, tangas">
		<meta name="author" content="Vimana Studio">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<!-- Mobile Specific Meta Tag-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<!-- Favicon and Apple Icons-->
		{{--  <link rel="icon" type="image/x-icon" href="favicon.ico">  --}}
		<link rel="icon" type="image/png" href="{{ asset('images/web/favicon.png') }}">
		<link rel="apple-touch-icon" href="{{ asset('store-ui/images/favicon.png') }}">
		<link rel="apple-touch-icon" sizes="152x152" href="{{ asset('store-ui/images/favicon.png') }}">
		<link rel="apple-touch-icon" sizes="180x180" href="{{ asset('store-ui/images/favicon.png') }}">
		<link rel="apple-touch-icon" sizes="167x167" href="{{ asset('store-ui/images/favicon.png') }}">
	
		<link rel="stylesheet" media="screen" href="{{ asset('css/store-custom.css') }}">
        <style>

            body {
                background: rgba(217,73,162,1);
                background: -moz-linear-gradient(top, rgba(217,73,162,1) 0%, rgba(246,227,170,1) 100%);
                background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(217,73,162,1)), color-stop(100%, rgba(246,227,170,1)));
                background: -webkit-linear-gradient(top, rgba(217,73,162,1) 0%, rgba(246,227,170,1) 100%);
                background: -o-linear-gradient(top, rgba(217,73,162,1) 0%, rgba(246,227,170,1) 100%);
                background: -ms-linear-gradient(top, rgba(217,73,162,1) 0%, rgba(246,227,170,1) 100%);
                background: linear-gradient(to bottom, rgba(217,73,162,1) 0%, rgba(246,227,170,1) 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d949a2', endColorstr='#f6e3aa', GradientType=0 );
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -ms-grid-row-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
            }

            .soon {
                text-align: center;
            }

            .soon h1 {
                margin-top: 25px;
                font-weight: 300;
                font-size: 1.3rem
            }
        </style>
	</head>
	<!-- Body-->
	<body>
        <div class="container soon">
            <div class="logo">
                <img src="{{ asset('images/web/app-logo.png') }}" alt="">
            </div>
            <h1>Próximamente...</h1>
        </div>	
	</body>
</html>





