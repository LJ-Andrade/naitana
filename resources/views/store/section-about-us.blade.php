@extends('store.partials.main')

@section('styles')
	<link rel="stylesheet" href="{{ asset('plugins/owl/assets/owl.carousel.min.css') }}">
@endsection

@section('header-image')
	{{-- Carousel Banner --}}
	<div class="owl-carousel">
		<img src="{{ asset('images/web/home-banner.jpg')}}" alt="Home Banner">
		<img src="{{ asset('images/web/home-banner.jpg')}}" alt="Home Banner">
	</div>
@endsection

@section('content')

<div class="container">
    <div class="row section-about-us">
        <div class="col-md-6 ">
            {{-- <img src="{{ asset('images/web/about-us.jpg') }}" alt="About Us"> --}}
        </div>
        <div class="col-md-12">
            <h2>Quienes Somos</h2>
{{-- 
            <hr>
            <br>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, harum cupiditate ratione, 
				accusamus debitis hic aspernatur commodi corporis quas, enim vitae tenetur consectetur asperiores 
				aliquid repellat adipisci itaque illum aut?</b> <br><br>
 --}}


        </div>
    </div>
</div>

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

	</script>
@endsection


