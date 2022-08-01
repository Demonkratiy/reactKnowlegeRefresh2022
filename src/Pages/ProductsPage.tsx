import { useState } from 'react';
import { CreateProduct } from '../components/CreateProduct';
import { ErrorPlaceholder } from '../components/ErrorPlaceholder';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { Product } from '../components/Product';
import { useProducts } from '../hooks/useProducts';
import { IProduct } from '../interface';

export function ProductsPage() {
  const { loading, addProduct, error, products } = useProducts();
  const [modalState, setModalState] = useState(false);

  const createHandler = (product: IProduct) => {
    setModalState(false);
    addProduct(product);
  };

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <Loader />}
      {error && <ErrorPlaceholder error={error} />}
      {products.map((product) => {
        return <Product product={product} key={product.id} />;
      })}
      {modalState && (
        <Modal title='Create new product' onClose={() => setModalState(false)}>
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}

      <button
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
        onClick={() => setModalState(true)}
      >
        +
      </button>
    </div>
  );
}
