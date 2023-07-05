import {
  calculateTileNumbers
} from '@/Utils/selector';

import { TILE_SIZE_IN_IQ_SAMPLES } from '../constants';
import { expectTypeOf } from 'vitest';

describe('calculateTileNumbers', () => {
 test('simple calculation is correct', () => {

    const fileSize = 1000000; // 1M samples
    const fftSize = 1024; // This is essentially samples per row
    const spectrogramHeight = 800; // Spectrogram is 800 pixels high
    const zoomLevel = 1;

    // Arrange && Act
    let tiles = calculateTileNumbers(0, fileSize, fftSize, spectrogramHeight, zoomLevel);

    const numberOfTiles = (spectrogramHeight * fftSize * zoomLevel) / TILE_SIZE_IN_IQ_SAMPLES;
    console.log(numberOfTiles);

    // Assert
    expect(tiles.lowerTile).toBe(0);
    expect(tiles.upperTile).toBe(numberOfTiles);
  });
});