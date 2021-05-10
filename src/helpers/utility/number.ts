export const randInt = () => (Math.floor(Math.random() * 3) + 1) * 1000

export const numberWithComma = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
