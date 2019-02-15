<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('layouts.head')
</head>
<body>
<div id="app">

    <main>

        @guest
            <guest-navbar></guest-navbar>
        @else
            <navbar></navbar>
        @endguest

        @yield('content')

    </main>

</div>
</body>
</html>
