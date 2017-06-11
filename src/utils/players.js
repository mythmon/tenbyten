import createHash from 'sha.js'
import { COLORS } from 'semantic-ui-react/dist/commonjs/lib/SUI'

export function displayName ({name, username, id}) {
  return name || username || id
}

export function iconLetter (player) {
  return displayName(player).slice(0, 1).toUpperCase()
}

export function color ({name, username, id}) {
  let hasher = createHash('sha256').update(id || '').update(name || '').update(username || '')
  let idHash = parseInt(hasher.digest('hex'), 16)
  return COLORS[idHash % COLORS.length]
}
