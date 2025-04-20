
import OrderFormModal from './OrderFormModal';
import { CartItem } from '@/pages/CategoryPage';

interface OrderFormProps {
  cart: CartItem[];
  total: number;
  onCancel: () => void;
  onComplete: () => void;
}

// This component now serves as a wrapper for OrderFormModal
// to maintain backward compatibility
const OrderForm = (props: OrderFormProps) => {
  return <OrderFormModal {...props} />;
};

export default OrderForm;
