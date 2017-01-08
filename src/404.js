(function () {
  const redirect = sessionStorage.redirect
  delete sessionStorage.redirect
  if (redirect && redirect !== location.href) {
    console.log(`redirecting to ${redirect} for GHSPA fallback`)
    history.replaceState(null, null, redirect)
  }
})()
