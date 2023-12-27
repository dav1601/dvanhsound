<!DOCTYPE html>
<html lang="en" id="html" >

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ env('SM_LOGO') }}">
    <title>Dvanh Sound</title>
    @routes
    <script>
        window.assetUrl = {{ Js::from(Storage::disk('public')->url('/')) }};
        window.ogLogo = {{ Js::from(env('OG_LOGO')) }};
        window.smLogo = {{ Js::from(env('SM_LOGO')) }}
    </script>
</head>

<body>

    <div id="app"></div>
    @vite(['resources/css/app.css', 'resources/sass/app.scss', 'resources/js/app.js'])

</body>

</html>
