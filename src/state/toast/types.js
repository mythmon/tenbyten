// @flow
export type ToastLevel =
  | "DEBUG"
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR"

export type ToastShowAction = {
  type: "TOAST_SHOW",
  id: number,
  level: ToastLevel,
  message: string,
}
