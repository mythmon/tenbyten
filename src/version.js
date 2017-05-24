// @flow
/* globals __COMMIT_HASH__, __COMMIT_DESCRIPTION__ */
declare var __COMMIT_HASH__: string
declare var __COMMIT_DESCRIPTION__: string
export const commitHash: string = __COMMIT_HASH__
export const commitDescription: string = __COMMIT_DESCRIPTION__
