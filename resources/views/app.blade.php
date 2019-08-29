<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>LARAVEL REACT CRUD</title>

        <meta charset="utf-8">
        <meta http-equiv="Content-Language" content="en">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="msapplication-tap-highlight" content="no">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Script -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <!-- Style -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    </head>
    
    <body>
        <!-- <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar"> -->
            <div id="app"></div>
        <!-- </div> -->
    </body>
 
</html>