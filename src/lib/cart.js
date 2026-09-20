export const CART_STORAGE_KEY = "cart";

const EMPTY_CART = [];

let cartSnapshot = null;

function readCartFromStorage() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  try {
    const cart = JSON.parse(
      window.localStorage.getItem(
        CART_STORAGE_KEY
      ) || "[]"
    );

    return Array.isArray(cart)
      ? cart
      : [];
  } catch (error) {
    console.error(
      "Failed to read cart:",
      error
    );

    return [];
  }
}

export function getCart() {
  return readCartFromStorage();
}

export function getCartSnapshot() {
  if (cartSnapshot === null) {
    cartSnapshot =
      readCartFromStorage();
  }

  return cartSnapshot;
}

export function subscribeToCart(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleCartUpdated = (event) => {
    cartSnapshot =
      event?.detail ||
      readCartFromStorage();

    callback();
  };

  const handleStorage = () => {
    cartSnapshot =
      readCartFromStorage();

    callback();
  };

  window.addEventListener(
    "cartUpdated",
    handleCartUpdated
  );

  window.addEventListener(
    "storage",
    handleStorage
  );

  return () => {
    window.removeEventListener(
      "cartUpdated",
      handleCartUpdated
    );

    window.removeEventListener(
      "storage",
      handleStorage
    );
  };
}

export function saveCart(cart) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedCart =
    Array.isArray(cart)
      ? cart
      : [];

  cartSnapshot =
    normalizedCart;

  window.localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(
      normalizedCart
    )
  );

  window.dispatchEvent(
    new CustomEvent(
      "cartUpdated",
      {
        detail:
          normalizedCart,
      }
    )
  );
}

export function getCartCount(
  cart = getCart()
) {
  return cart.reduce(
    (total, item) =>
      total +
      Number(
        item?.quantity || 0
      ),
    0
  );
}

export function getCartSubtotal(
  cart = getCart()
) {
  return cart.reduce(
    (total, item) =>
      total +
      Number(
        item?.price || 0
      ) *
        Number(
          item?.quantity || 0
        ),
    0
  );
}

export function openCartDrawer() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(
      "openCartDrawer"
    )
  );
}

export function addProductToCart(
  product,
  {
    size = "Standard",
    quantity = 1,
    image = null,
  } = {}
) {
  if (!product?.id) {
    console.error(
      "Cannot add product without an id."
    );

    return getCart();
  }

  const cart = getCart();

  const normalizedSize =
    size || "Standard";

  const normalizedQuantity =
    Math.max(
      1,
      Number(quantity) || 1
    );

  const productImage =
    image ||
    product?.primary_image ||
    product?.images?.find(
      (img) =>
        img?.is_primary
    )?.url ||
    product?.images?.[0]?.url ||
    null;

  const cartItem = {
    id: product.id,
    name: product.name || "",
    slug: product.slug || "",
    price: Number(
      product.price || 0
    ),
    currency:
      product.currency ||
      "PKR",
    size: normalizedSize,
    image: productImage,
    quantity:
      normalizedQuantity,
  };

  const existingIndex =
    cart.findIndex(
      (item) =>
        String(item?.id) ===
          String(
            cartItem.id
          ) &&
        String(
          item?.size ||
            "Standard"
        ) ===
          String(
            cartItem.size
          )
    );

  let updatedCart;

  if (existingIndex !== -1) {
    updatedCart = [...cart];

    updatedCart[
      existingIndex
    ] = {
      ...updatedCart[
        existingIndex
      ],
      quantity:
        Number(
          updatedCart[
            existingIndex
          ].quantity || 0
        ) +
        normalizedQuantity,
    };
  } else {
    updatedCart = [
      ...cart,
      cartItem,
    ];
  }

  saveCart(updatedCart);

  return updatedCart;
}

export function updateCartItemQuantity(
  id,
  size,
  delta
) {
  const cart = getCart();

  const index =
    cart.findIndex(
      (item) =>
        String(item?.id) ===
          String(id) &&
        String(
          item?.size ||
            "Standard"
        ) ===
          String(
            size ||
              "Standard"
          )
    );

  if (index === -1) {
    return cart;
  }

  const updatedCart = [
    ...cart,
  ];

  const currentQuantity =
    Number(
      updatedCart[index]
        ?.quantity || 0
    );

  const newQuantity =
    currentQuantity +
    Number(delta || 0);

  if (newQuantity <= 0) {
    updatedCart.splice(
      index,
      1
    );
  } else {
    updatedCart[index] = {
      ...updatedCart[index],
      quantity:
        newQuantity,
    };
  }

  saveCart(updatedCart);

  return updatedCart;
}

export function removeCartItem(
  id,
  size
) {
  const cart = getCart();

  const updatedCart =
    cart.filter(
      (item) =>
        !(
          String(item?.id) ===
            String(id) &&
          String(
            item?.size ||
              "Standard"
          ) ===
            String(
              size ||
                "Standard"
            )
        )
    );

  saveCart(updatedCart);

  return updatedCart;
}

export function clearCart() {
  saveCart([]);
}