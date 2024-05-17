import classNames from "classnames"

export function cn(...inputs: string[]) {
  return classNames(...inputs)
}

export const handleError = (error: string) => {
  throw new Error(error)
}
