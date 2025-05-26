import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ email: req.params.email }).populate('items.prodId');
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { email, prodId, qty } = req.body;
  let cart = await Cart.findOne({ email });

  if (!cart) {
    cart = new Cart({ email, items: [{ prodId, qty }] });
  } else {
    const itemIndex = cart.items.findIndex(item => item.prodId.equals(prodId));
    if (itemIndex >= 0) {
      cart.items[itemIndex].qty += qty;
    } else {
      cart.items.push({ prodId, qty });
    }
  }

  cart.totalPrice = 0;
  for (const item of cart.items) {
    const price = item.prodId.price || 0;
    cart.totalPrice += price * item.qty;
  }

  await cart.save();
  res.json(cart);
};

export const deleteCartItem = async (req, res) => {
  const { email, prodId } = req.body;
  const cart = await Cart.findOne({ email });
  cart.items = cart.items.filter(item => !item.prodId.equals(prodId));
  await cart.save();
  res.json(cart);
};
