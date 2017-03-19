module.exports = (initialHtml = '') => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Redux Boilerplate</title>
  <link rel="stylesheet" href="/static/styles.css" />
</head>
<body>
  <div id="root">${initialHtml}</div>
  <script src="/static/vendor.bundle.js"></script>
  <script src="/static/bundle.js"></script>
</body>
</html>
`
