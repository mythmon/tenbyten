export default function lazyGetter (target, key, descriptor) {
  const privateKey = Symbol('_' + key)
  const getter = descriptor.get

  descriptor.get = function () {
    if (this[privateKey] === undefined) {
      this[privateKey] = getter.call(this)
    }
    return this[privateKey]
  }
}
