{!! Form::open(['route' => 'store', 'method' => 'GET', 'id' => 'SearchFilters', 'class' => 'filters pad0']) !!}
    {{-- Search --}}
    <div class="filter-item input-with-icon search-input">
        <input class="form-control" type="text" value="" placeholder="Buscar...">
        <button type="submit" class="search-btn"><i class="fa fa-search"></i></button>
        <a class="filter-trigger" onclick="openFilters()"><i class="fas fa-sliders-h"></i></a>
        {{-- <div class="filter-trigger">
            <a onclick="openFilters()"><i class="fas fa-sliders-h"></i></a>
        </div> --}}
    </div>
    {{-- Order --}}
    <div class="FilterSelector filter-selector filter-item inactive">
        <select class="form-control" name="order"  onchange="location = this.value;">
            <option value="" disabled selected>Ordernar por</option>
            <option value="{{ route('store', ['precio' => 'menor']) }}">Menor precio</option>
            <option value="{{ route('store', ['precio' => 'mayor']) }}">Mayor precio</option>
            <option value="{{ route('store', ['filtrar' => 'populares']) }}">Populares</option>
        </select>
    </div>
    {{-- Categories --}}
    <div class="FilterSelector filter-selector filter-item inactive">
        <select class="form-control item" name="categories" onchange="location = this.value;">
            <option value="Categories" selected disabled>Categorías</option>
            @foreach($categories as $category)
                <option value="{{ route('store', 'categoria=').$category->id }}"> {{ $category->name }} </option>
            @endforeach
        </select>
    </div>
    {{-- Tags --}}
    <div class="FilterSelector filter-selector filter-item inactive">
        <select class="form-control item" name="tags" onchange="location = this.value;">
            <option value="Etiquetas" selected disabled>Etiquetas</option>
            @foreach($tags as $tag)
                <option value="{{ route('store.search.tag', $tag->name) }}"> {{ $tag->name }} </option>
            @endforeach
        </select>
    </div>

{!! Form::close() !!}


