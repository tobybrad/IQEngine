import {
  calculateTileNumbers, filterVisibleTiles
} from '@/utils/selector';

import { TILE_SIZE_IN_IQ_SAMPLES } from '../constants';
import { expectTypeOf } from 'vitest';

describe('calculateTileNumbers', () => {
  const fileSize = 1000000; // 1M samples
  const fftSize = 1024; // This is essentially samples per row
  const spectrogramHeight = 800; // Spectrogram is 800 pixels high
  const zoomLevel = 1;
 
 test('simple calculation is correct', () => {

    // Arrange && Act
    let tiles = calculateTileNumbers(0, fileSize, fftSize, spectrogramHeight, zoomLevel);

    const numberOfTiles = (spectrogramHeight * fftSize * zoomLevel) / TILE_SIZE_IN_IQ_SAMPLES;
    console.log(numberOfTiles);

    // Assert
    expect(tiles.lowerTile).toBe(0);
    expect(tiles.upperTile).toBe(numberOfTiles);
  });
});

describe('filterVisibleTiles', () => {

  const fftSize = 1024; // This is essentially samples per row
  const spectrogramHeight = 800; // Spectrogram is 800 pixels high

  test('all tiles are visible', () => {
    const tiles = filterVisibleTiles(0, 7, fftSize, spectrogramHeight);
    expect(tiles).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test('not all tiles are visible', () => {
    const tiles = filterVisibleTiles(0, 10000, fftSize, spectrogramHeight);
    expect(tiles).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});