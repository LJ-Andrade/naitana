@extends('vadmin.partials.main')
@section('title', 'VADmin | Métodos de Envío')

@section('styles')
@endsection

@section('header')
	@component('vadmin.components.header')
		@slot('breadcrums')
			<li class="breadcrumb-item"><a href="{{ url('vadmin')}}">Inicio</a></li>
			<li class="breadcrumb-item"><a href="{{ route('categories.index')}}">Listado</a></li>
			<li class="breadcrumb-item active">Nuevo método de envío</li>
		@endslot
		@slot('actions')
			<div class="list-actions">
				<h1>Nuevo Método de Envío</h1>
			</div>
		@endslot
	@endcomponent
@endsection

@section('content')
	<div class="inner-wrapper">
		<div class="row">
			<div class="col-sm-12 col-md-6">
				{!! Form::open(['route' => 'shippings.store', 'method' => 'POST', 'class' => 'row big-form', 'data-parsley-validate' => '']) !!}	
					@include('vadmin.catalog.shippings.form')
					<div class="form-actions right">
						<a href="{{ route('shippings.index')}}">
							<button type="button" class="btn btnRed mx-1">
								<i class="icon-cross2"></i>
							</button>
						</a>
						<button type="submit" class="btn btnGreen">
							<i class="icon-check2"></i> Guardar
						</button>
					</div>
				{!! Form::close() !!}
			</div>
			<div class="col-sm-12 col-md-6">
				@component('vadmin.components.infoContainer')
					@slot('text')
					<b>El método de envío</b></b> que será creado aparecerá como una opción a seleccionar por el cliente al momento de finalizar su compra (checkout). <br><br>
					<b>El costo indicado</b></b> se sumará al subtotal de la compra.
					@endslot
				@endcomponent
			</div>
		</div>
	</div>  
@endsection

@section('scripts')
	<script type="text/javascript" src="{{ asset('plugins/validation/parsley.min.js') }}" ></script>
	<script type="text/javascript" src="{{ asset('plugins/validation/es/parsley-es.min.js') }}" ></script>
@endsection


