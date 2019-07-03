@extends('store.partials.main')

@section('styles')
	<link rel="stylesheet" href="{{ asset('plugins/owl/assets/owl.carousel.min.css') }}">
@endsection

@section('header-image')
	{{-- Carousel Banner --}}
	<div class="owl-carousel">
		<img src="{{ asset('images/web/home-banner.jpg')}}" alt="Naitana Home Banner">
		<img src="{{ asset('images/web/home-banner.jpg')}}" alt="Naitana Home Banner">
	</div>
@endsection


@section('content')
<a href="" class="anchor" style="" id="TopIndexAnchor"></a>
<div class="container info-container">
    <div class="row justify-content-center">
        <img style="max-width: 100%; width: 300px; margin-bottom: 30px" src="{{ asset('images/web/como-comprar.png') }}" alt="">
    </div>

    <div class="row image-and-text-items">
        <div class="col-sm-12 col-md-6 icon-img-and-text">
            <img src="{{ asset('images/web/icon-2.png') }} " alt="Compras">
            <p>Para ver talles y colores de cada modelo así como para comprar debes crear tu usuario e ingresar al sistema. Donde deberás indicarnos si tu compra es mayorista o minorista.</p>
        </div>
        <div class="col-sm-12 col-md-6 icon-img-and-text">
            <img src="{{ asset('images/web/icon-3.png') }} " alt="Compras">
            <p>Los carros abiertos permanecen por 48 hs y luego
                se dan de baja. No demores más de este tiempo
                para confirmar tu pedido o te quedarás sin stock.</p>
        </div>
        <div class="col-sm-12 col-md-6 icon-img-and-text">
            <img src="{{ asset('images/web/icon-4.png') }} " alt="Compras">
            <p>Las opciones de pago y envío las podrás elegir antes de
                finalizar tu pedido. Hay varias opciones para que puedas
                realizar la compra a tu medida!</p>
        </div>
        <div class="col-sm-12 col-md-6 icon-img-and-text">
            <img src="{{ asset('images/web/icon-5.png') }} " alt="Compras">
            <p>Una vez que hayas confirmado tu pedido chequeamos stock
                y dentro de las 48 hs te contactamos para decirte si está
                todo ok o si algo no está en stock. No hagas el pago hasta
                ese momento!</p>
        </div>
        <div class="col-sm-12 col-md-6 icon-img-and-text">
            <img src="{{ asset('images/web/icon-6.png') }} " alt="Compras">
            <p>Luego del pago procedemos a armar tu pedido y el envío
                es dentro de las 48 hs siguientes.</p>
        </div>
    </div>
</div>
<br><br><br><br>
@endsection

@section('scripts')
	@include('store.components.bladejs')
	<script type="text/javascript" src="{{ asset('plugins/owl/owl.carousel.min.js') }}" ></script>
	<script>
		$(document).ready(function(){
			$('.owl-carousel').owlCarousel({
				stagePadding: 0,
				items: 1,
				loop: true,
				margin: 0,
				singleItem: true,
				nav: false,
				dots: false,
				navText: [
					// "<i class='fa fa-caret-left'></i>",
					// "<i class='fa fa-caret-right'></i>"
				],
				dots:true
			});
		});

        $(function() {
				// $(document).scrollTop( $("#TopIndexAnchor").offset().top);  
				var jump = $('#TopIndexAnchor');
				var new_position = $(jump).offset();
				$('html, body').stop().animate({ scrollTop: new_position.top }, 500);
			});
	</script>
@endsection