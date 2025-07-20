<script>
  function handleBooking(type, formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const endpoint =
      type === "swap"
        ? "https://us-central1-goswap-booking.cloudfunctions.net/swapCheckout"
        : "https://us-central1-goswap-booking.cloudfunctions.net/leaseCheckout";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.redirect) {
          window.location.href = res.redirect;
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        alert("Error connecting to payment service.");
      });
  }
</script>