function hide(...args) {
  args.forEach(value => value.classList.add('no-show'));
}
function show(...args) {
  args.forEach(value => value.classList.remove('no-show'));
}

export { hide, show };