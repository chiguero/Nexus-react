import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritosProvider } from './context/FavoritosContext'
import { CarritoProvider } from './context/CarritoContext'
import { RutaPrivada } from './components/RutaPrivada'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carrito from './components/Carrito'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Catalogo from './pages/Catalogo'
import DetalleLibro from './pages/DetalleLibro'
import MiCuenta from './pages/MiCuenta'
import Favoritos from './pages/Favoritos'
import Checkout from './pages/Checkout'

import './App.css'

function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  
  // En desarrollo no usar basename, en producción sí
  const basename = import.meta.env.DEV ? '/' : '/crismp2';

  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritosProvider>
          <CarritoProvider>
            <BrowserRouter basename={basename}>
              <div className="App">
                <Navbar abrirCarrito={() => setCarritoAbierto(true)} />
                
                <main>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/libro/:id" element={<DetalleLibro />} />
                    
                    {/* RUTAS PROTEGIDAS - Solo para usuarios logueados */}
                    <Route 
                      path="/favoritos" 
                      element={
                        <RutaPrivada>
                          <Favoritos />
                        </RutaPrivada>
                      } 
                    />
                    
                    <Route 
                      path="/mi-cuenta" 
                      element={
                        <RutaPrivada>
                          <MiCuenta />
                        </RutaPrivada>
                      } 
                    />
                    
                    {/* CHECKOUT - Solo para usuarios logueados */}
                    <Route 
                      path="/checkout" 
                      element={
                        <RutaPrivada>
                          <Checkout />
                        </RutaPrivada>
                      } 
                    />
                  </Routes>
                </main>

                <Footer />
                
                {/* Carrito Sidebar */}
                <Carrito 
                  mostrar={carritoAbierto} 
                  cerrar={() => setCarritoAbierto(false)} 
                />
              </div>
            </BrowserRouter>
          </CarritoProvider>
        </FavoritosProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App