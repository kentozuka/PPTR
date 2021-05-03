const hrstart = process.hrtime()

export const second = () => {
  const c = process.hrtime(hrstart)
  return `${c[0]}` // second
}
