export const LSK = 'Ⱡ';

export function isEmptyObject(obj: any) {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

export function timestamp() {
    const millisSinceEpoc = Date.now() - Date.parse('2016-05-24T17:00:00.000Z');
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return  parseInt(inSeconds);
}

function volatility (values) {
    const n = values.length
   
    const mean = values.reduce((a, b) => (a + b), 0) / n
   
    const deviation = values.reduce((dev, val) => (dev + (val - mean) * (val - mean)), 0)
   
    return Math.sqrt(deviation / n)
}

export const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae semper quis lectus nulla. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Egestas sed tempus urna et pharetra pharetra massa massa. Mattis enim ut tellus elementum sagittis vitae et. Lacus suspendisse faucibus interdum posuere. Suspendisse potenti nullam ac tortor. Id semper risus in hendrerit. Aliquam id diam maecenas ultricies mi. Eu mi bibendum neque egestas.';