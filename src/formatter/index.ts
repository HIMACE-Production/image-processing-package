import sharp from 'sharp';

export async function imread(path: string) {
  try {
    const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
    const width = info.width;
    const height = info.height;
    const pixelArray: number[][][] = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIndex = (y * width + x) * 3;

        const pixel = [];
        for (let c = 0; c < 3; c++) {
          pixel.push(data[pixelIndex + c]);
        }

        if (!pixelArray[y]) {
          pixelArray[y] = [];
        }
        pixelArray[y][x] = pixel;
      }
    }

    return pixelArray;
    
  } catch (error: any) {
    throw error
  }
}

export async function imsave(dataArray: number[][][] | number[][], pathToSave = "result.jpg"): Promise<void> {
    try {
        const width = dataArray[0].length;
        const height = dataArray.length;
    
        const imageData = Buffer.alloc(width * height * 3);
    
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelIndex = (y * width + x) * 3;
                if (typeof dataArray[y][x] === "number") {
                    imageData[pixelIndex] = dataArray[y][x] as number;
                    imageData[pixelIndex + 1] = dataArray[y][x] as number;
                    imageData[pixelIndex + 2] = dataArray[y][x] as number;
                } else {        
                    const [red, green, blue] = dataArray[y][x] as number[];
            
                    imageData[pixelIndex] = red;
                    imageData[pixelIndex + 1] = green;
                    imageData[pixelIndex + 2] = blue;
                } 
            }
        }
  
        await sharp(imageData, { raw: { width, height, channels: 3 } }).toFile(pathToSave);
    } catch (error: any) {
        throw error
    }
}