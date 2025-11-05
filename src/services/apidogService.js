import { API_BASE_URL } from '../config/api';

// Función genérica para hacer peticiones
async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (res.status === 204) return null; // Sin contenido

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) throw { status: res.status, data };
    return data;
  } catch (err) {
    console.error(`❌ Error en ${endpoint}`, err.status || "", err.data || err);
    throw err;
  }
}

// ============================================
// FUNCIONES PARA LIBROS
// ============================================

export async function obtenerLibros(filtros = {}) {
  const params = new URLSearchParams();
  
  if (filtros.authorId) params.append('authorId', filtros.authorId);
  if (filtros.categoryId) params.append('categoryId', filtros.categoryId);
  if (filtros.publisherId) params.append('publisherId', filtros.publisherId);
  if (filtros.title) params.append('title', filtros.title);
  if (filtros.yearFrom) params.append('yearFrom', filtros.yearFrom);
  if (filtros.yearTo) params.append('yearTo', filtros.yearTo);
  if (filtros.priceMin) params.append('priceMin', filtros.priceMin);
  if (filtros.priceMax) params.append('priceMax', filtros.priceMax);

  const query = params.toString();
  return await apiFetch(`/books${query ? '?' + query : ''}`);
}

export async function obtenerLibroPorId(id) {
  return await apiFetch(`/books/${id}`);
}

export async function crearLibro(libro) {
  return await apiFetch('/books', {
    method: 'POST',
    body: libro
  });
}

export async function actualizarLibro(id, libro) {
  return await apiFetch(`/books/${id}`, {
    method: 'PUT',
    body: libro
  });
}

export async function actualizarLibroParcial(id, cambios) {
  return await apiFetch(`/books/${id}`, {
    method: 'PATCH',
    body: cambios
  });
}

export async function eliminarLibro(id) {
  return await apiFetch(`/books/${id}`, {
    method: 'DELETE'
  });
}

// ============================================
// FUNCIONES PARA AUTORES
// ============================================

export async function obtenerAutores() {
  return await apiFetch('/authors');
}

export async function obtenerAutorPorId(id) {
  return await apiFetch(`/authors/${id}`);
}

export async function crearAutor(autor) {
  return await apiFetch('/authors', {
    method: 'POST',
    body: autor
  });
}

export async function actualizarAutor(id, cambios) {
  return await apiFetch(`/authors/${id}`, {
    method: 'PATCH',
    body: cambios
  });
}

export async function eliminarAutor(id) {
  return await apiFetch(`/authors/${id}`, {
    method: 'DELETE'
  });
}

// ============================================
// FUNCIONES PARA CATEGORÍAS
// ============================================

export async function obtenerCategorias() {
  return await apiFetch('/categories');
}

export async function obtenerCategoriaPorId(id) {
  return await apiFetch(`/categories/${id}`);
}

export async function crearCategoria(categoria) {
  return await apiFetch('/categories', {
    method: 'POST',
    body: categoria
  });
}

export async function actualizarCategoria(id, cambios) {
  return await apiFetch(`/categories/${id}`, {
    method: 'PATCH',
    body: cambios
  });
}

export async function eliminarCategoria(id) {
  return await apiFetch(`/categories/${id}`, {
    method: 'DELETE'
  });
}

// ============================================
// FUNCIONES PARA EDITORIALES
// ============================================

export async function obtenerEditoriales() {
  return await apiFetch('/publishers');
}

export async function obtenerEditorialPorId(id) {
  return await apiFetch(`/publishers/${id}`);
}

export async function crearEditorial(editorial) {
  return await apiFetch('/publishers', {
    method: 'POST',
    body: editorial
  });
}

export async function actualizarEditorial(id, editorial) {
  return await apiFetch(`/publishers/${id}`, {
    method: 'PUT',
    body: editorial
  });
}

export async function eliminarEditorial(id) {
  return await apiFetch(`/publishers/${id}`, {
    method: 'DELETE'
  });
}

// ============================================
// FUNCIONES PARA RESEÑAS
// ============================================

export async function obtenerResenas(bookId = null) {
  const query = bookId ? `?bookId=${bookId}` : '';
  return await apiFetch(`/reviews${query}`);
}

export async function obtenerResenaPorId(id) {
  return await apiFetch(`/reviews/${id}`);
}

export async function crearResena(resena) {
  return await apiFetch('/reviews', {
    method: 'POST',
    body: resena
  });
}

export async function actualizarResena(id, cambios) {
  return await apiFetch(`/reviews/${id}`, {
    method: 'PATCH',
    body: cambios
  });
}

export async function eliminarResena(id) {
  return await apiFetch(`/reviews/${id}`, {
    method: 'DELETE'
  });
}

// ============================================
// FUNCIONES PARA BIBLIOTECA
// ============================================

export async function obtenerBiblioteca() {
  return await apiFetch('/library');
}