export const xpathPattern =
  /^\/?(?:\*?\[@id="[^"]+"\]|\*?\[local-name\(\)="[^"]+"\](?:\[[0-9]+\])?|[a-zA-Z0-9_-]+(?:\[[0-9]+\])?)(?:\/(?:\*?\[@id="[^"]+"\]|\*?\[local-name\(\)="[^"]+"\](?:\[[0-9]+\])?|[a-zA-Z0-9_-]+(?:\[[0-9]+\])?))*$/

export const kebabCasePattern = /^[a-z]+(-[a-z]+)*$/

export const windowIdPattern = /W(\d)+/

export const tabIdPattern = /T(\d)+/

export const groupIdPattern = /G(\d)+/

export const colorPattern = /\{t(fg|bg):([A-Za-z]+)\}/g

// FIXME: Delete after 0.9.1 realese
export const oldColorPattern = /\[termo\.(color|bgcolor)\.([A-Za-z]+)\]/g
