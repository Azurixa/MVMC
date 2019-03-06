<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('modules.head')
</head>
<body>
<div id="app">

    <main>

        @guest
            <navbar level="0"></navbar>
        @else
            @if(Auth::user()->permissions > 9)
                <navbar level="2"></navbar>
            @else
                <navbar level="1"></navbar>
            @endif
        @endguest

        @yield('content')

    </main>

</div>
</body>
</html>
