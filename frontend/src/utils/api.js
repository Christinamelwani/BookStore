const BASE_URL = "http://localhost:3000";

export async function editBookData(book) {
  try {
    const response = await fetch(`${BASE_URL}/book/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function restockBook(book, stock) {
  try {
    const response = await fetch(`${BASE_URL}/book/${book.id}/restock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    });

    return response.json();
  } catch (error) {
    throw new Error("Failed to restock");
  }
}

export async function deleteBook(book) {
  try {
    const response = await fetch(`${BASE_URL}/book/${book.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    throw new Error("Failed to delete");
  }
}

export async function addToCart(bookId) {
  const access_token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    access_token,
  };

  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers,
    body: JSON.stringify({ bookId }),
  });

  return response.json();
}

export async function removeFromCart(bookId) {
  const access_token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    access_token,
  };

  const response = await fetch(`${BASE_URL}/cart/${bookId}`, {
    method: "DELETE",
    headers,
  });

  return response.json();
}

export async function fetchCartData() {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkoutCartData() {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: { access_token: localStorage.getItem("access_token") },
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addBookData(book) {
  try {
    const response = await fetch(`${BASE_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchBookData(bookId) {
  try {
    const response = await fetch(`${BASE_URL}/book/${bookId}`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchBooksData() {
  try {
    const response = await fetch(`${BASE_URL}/book`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserData() {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(userData) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response;
}

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response;
}
