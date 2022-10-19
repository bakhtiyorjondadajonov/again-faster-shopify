window.addEventListener("load", function () {
  const postAJAXfn = function (formData) {
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const variantForm = document.querySelector(".variant-form");
  if (variantForm) {
    const labels = document.querySelectorAll(".variant__label");
    console.log(labels);
    labels.forEach((label) => {
      label.addEventListener("click", function () {
        const price = label.dataset.variantPrice / 100;
        //------PRODUCT PRICE CHANGE -----------//
        console.log(price);
        document.querySelector(
          ".product__price"
        ).textContent = `$${price}.00 USD`;

        // ----------- SUBSCRIPTION PRICE CHANGE ---------
        if (document.querySelector(".form-subscription")) {
          const discount = document.querySelector(".monthly-subscription")
            .dataset.discount;
          const priceContainer = document.querySelectorAll(
            ".subscription-price"
          );
          priceContainer[0].textContent = `$${price}.00 USD`;
          priceContainer[1].textContent = `$${
            price - (price * discount) / 100
          }.00 USD`;
        }
      });
    });
    variantForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formSubscription = document.querySelector(".form-subscription");
      if (formSubscription) {
        const oneTimePurchaseBtn = document.querySelector(
          ".one-time-purchase-input"
        );
        const subscriptionBtn = document.querySelector(".subscription-input");
        const sellingPlanContainer = document.querySelector(
          ".selling-plan__container"
        );
        // ------------ WHEN ONE TIME PURCHASE OPTION IS SELECTED --------
        if (oneTimePurchaseBtn.checked) {
          let formData = {
            items: [
              {
                id: document.querySelector('input[name="variant"]:checked')
                  .value,
                quantity: 1,
              },
            ],
          };
          postAJAXfn(formData);
        }
        // ------------ WHEN SUBSCRIPTION OPTION IS SELECTED --------

        if (subscriptionBtn.checked) {
          console.log(
            document.querySelector('input[name="subscription-period"]:checked')
              .value
          );
          let formData = {
            items: [
              {
                id: document.querySelector('input[name="variant"]:checked')
                  .value,
                quantity: 1,
                selling_plan: document.querySelector(
                  'input[name="subscription-period"]:checked'
                ).value,
              },
            ],
          };

          postAJAXfn(formData);
        }
      } else {
        const formData = {
          items: [
            {
              id: document.querySelector('input[name="variant"]:checked').value,
              quantity: 1,
            },
          ],
        };
        postAJAXfn(formData);
      }
    });
  }
});

// --------- FRECUENTLY BOUGHT FUNCTUALITY -------
window.addEventListener("click", function (e) {
  const btn = e.target.closest(".product-card_btn");
  if (!btn) return;

  const variantId = btn.dataset.variantid;

  const formData = {
    items: [
      {
        id: variantId,
        quantity: 1,
      },
    ],
  };

  fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
