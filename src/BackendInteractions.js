export default {
  makePurchase(data, setData) {
    setData(data)
    fetch("/purchase.json", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ transaction: data })
    })
    .then((response) => response.json())
    .then((res) => setData({ ...res, raw: JSON.stringify(res) }))
    .catch((res) => console.error(res))
  },

  getTransaction(token, setData) {
    fetch(`/transactions/${token}.json`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((res) => setData({ ...res, raw: JSON.stringify(res) }))
    .catch((res) => console.error(res))
  },

  makeCompletion(token, setData, success) {
    fetch(`/complete/${token}.json`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({})
    })
    .then((response) => response.json())
    .then((response) => {
      setData({ ...response, raw: JSON.stringify(response) });
      success(response);
    })
    .catch((res) => console.error(res))
  }
}