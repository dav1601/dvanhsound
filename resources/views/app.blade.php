<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon"
        href="https://res.cloudinary.com/vanh-tech/image/upload/v1699740025/dvanhsound/images/favicon_amhwfa.png">
    <title>Dvanh Sound</title>

    <script>
        window.assetUrl = {{ Js::from(Storage::disk('public')->url('/')) }};
    </script>
</head>

<body>

    <div id="app"></div>
    @vite(['resources/sass/app.scss', 'resources/css/app.css', 'resources/js/app.js'])

</body>

</html>
