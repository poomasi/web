export function getMobileVw(size: number): string {
  return `${(size / 375) * 100}vw`
}

export function getMobileVh(size: number): string {
  return `${(size / 844) * 100}vh`
}

export function getPcVw(size: number): string {
  return `${(size / 1920) * 100}vw`
}

export function getPcVh(size: number): string {
  return `${(size / 1080) * 100}vw`
}
