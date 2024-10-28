import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSearch = async () => {
    const res = await fetch(`/api/products?code=${code}`);
    const data = await res.json();
    setProducts(data ? [data] : []);
  };

  const handleCreate = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name, description, price: parseFloat(price) }),
    });
    fetchProducts();
  };

  const handleUpdate = async (id) => {
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, code, name, description, price: parseFloat (price) }),
    });
    fetchProducts();
  };

  return (
    <div>
      <h1>Productos</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código"
      />
      <button onClick={handleSearch}>Busqueda por codigo</button>
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio"
      />
      <button onClick={handleCreate}>Creacion de Registros</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} ({product.code}) - {product.price}
            <button onClick={() => handleUpdate(product.id)}>Actualizar Productos</button>
          </li>
         
        ))}
      </ul>
    </div>
  );
}