// Mapeo de ID de libro → imagen local
export const imagenesPortadas = {
  1: 'images/portadas/1.jpg',
  2: 'images/portadas/2.jpg',
  3: 'images/portadas/3.jpg',
  4: 'images/portadas/4.jpg',
  5: 'images/portadas/5.jpg',
  6: 'images/portadas/6.jpg',
  7: 'images/portadas/7.jpg',
  8: 'images/portadas/8.jpg',
  9: 'images/portadas/9.jpg',
  10: 'images/portadas/10.jpg',
  11: 'images/portadas/11.jpg',
  12: 'images/portadas/12.jpg',
  13: 'images/portadas/13.jpg',
  14: 'images/portadas/14.jpg',
  15: 'images/portadas/15.jpg',
  16: 'images/portadas/16.jpg',
  17: 'images/portadas/17.jpg',
  18: 'images/portadas/18.jpg',
  19: 'images/portadas/19.jpg',
  20: 'images/portadas/20.jpg',
  21: 'images/portadas/21.jpg',
  22: 'images/portadas/22.jpg',
  23: 'images/portadas/23.jpg',
  24: 'images/portadas/24.jpg',
  25: 'images/portadas/25.jpg',
  26: 'images/portadas/26.jpg',
  27: 'images/portadas/27.jpg',
  28: 'images/portadas/28.jpg',
  29: 'images/portadas/29.jpg',
  30: 'images/portadas/30.jpg',
};

// Función helper para obtener la imagen
export function obtenerPortada(libroId, urlOriginal) {
  // Si existe imagen local, usarla
  if (imagenesPortadas[libroId]) {
    return imagenesPortadas[libroId];
  }
  // Si no, usar la URL original de la API
  return urlOriginal || 'images/portadas/placeholder.jpg';
}