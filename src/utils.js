export function actionMap (prefix, actionNames) {
  const ret = {}
  for (const name of actionNames) {
    ret[name] = Symbol(`${prefix}.${name}`)
  }
  return ret
}
