<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>LNU IDS</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

</head>
<body class="hold-transition layout-top-nav">
    <div class="wrapper">
        <div class="content-wrapper">
            <section class="content center">
                <div class="container-fluid" style="width: 95%">
                    <iframe id="documentPreview" src="{{url($src)}}#zoom=120" style="width:100%;"></iframe>
                </div>
            </section>
        </div>
    </div>
</body>
<script src="{{ asset('assets/js/jquery-3.7.1.min.js') }}"></script>
<script>
    $('#documentPreview').css('height', $(window).height());
</script>
</html>
