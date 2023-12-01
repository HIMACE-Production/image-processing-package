export function rgb2gray(dataArray: number[][][]) {
    const gray: number[][] = []
    const width = dataArray[0].length;
    const height = dataArray.length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const [red, green, blue] = dataArray[y][x];
  
          if (!gray[y]) {
            gray[y] = []
          }

          gray[y][x] = (0.299 * red) + (0.587 * green) + (0.114 * blue)
        }
    }

    return gray;
}