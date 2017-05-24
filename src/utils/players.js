// @flow
import createHash from 'sha.js'
import { COLORS } from 'semantic-ui-react/dist/commonjs/lib/SUI'

import type { Player } from 'tenbyten/state/players/types'

export function displayName ({name, username, id}: Player): string {
  return name || username || id
}

export function iconLetter (player: Player): string {
  return displayName(player).slice(0, 1).toUpperCase()
}

export function color ({name, username, id}: Player): string {
  let hasher = createHash('sha256').update(id || '').update(name || '').update(username || '')
  let idHash = parseInt(hasher.digest('hex'), 16)
  return COLORS[idHash % COLORS.length]
}
