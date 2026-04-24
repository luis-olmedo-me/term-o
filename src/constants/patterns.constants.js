export const kebabCasePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

export const windowIdPattern = /W(\d)+/

export const tabIdPattern = /T(\d)+/

export const groupIdPattern = /G(\d)+/

export const colorPattern = /\{t(fg|bg):([A-Za-z]+)\}/g

// FIXME: Delete after 0.9.1 realese
export const oldColorPattern = /\[termo\.(color|bgcolor)\.([A-Za-z]+)\]/g
