{!! Form::open(['route' => 'store', 'method' => 'GET', 'id' => 'SearchFilters', 'class' => 'filters pad0']) !!}
    
    <div class="filter-item input-icon-right search-input">
        <input type="text" value="" placeholder="buscar">
        <button type="submit" class="search-btn icon"><i class="fa fa-search"></i></button>
        <div class="filter-trigger">
            <a onclick="openFilters()"><i class="fas fa-sliders-h"></i></a>
        </div>
    </div>

    <div class="FilterSelector filter-selector filter-item inactive">
        <select name="" id="">
            <option value=""> option 1 </option>
            <option value=""> option 1 </option>
            <option value=""> option 1 </option>
        </select>
    </div>
    <div class="FilterSelector filter-selector filter-item inactive">
        <select name="" id="">
            <option value=""> option 1 </option>
            <option value=""> option 1 </option>
            <option value=""> option 1 </option>
        </select>
    </div>
    <div class="FilterSelector filter-selector filter-item inactive">
        <select name="" id="">
            <option value=""> option 1 </option>
            <option value=""> option 1 </option>
            <option value=""> option 1 </option>
        </select>
    </div>
{!! Form::close() !!}


