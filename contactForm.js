(function() {
    const countrySelect = document.getElementById('00NQl00000235gN');
    const mobileInput = document.getElementById('mobile');
    const phoneInput = document.getElementById('phone');
    const preferredChannelSelect = document.getElementById('00NHp00001Kepqp');
    const theForm = document.getElementById('webtolead_form');
    const productErrorMessage = document.getElementById('product-error-message');
    const mobileLabel = document.getElementById('mobile_label');
    const phoneLabel = document.getElementById('phone_label');
  
    function updateProducts() {
      var selectedProducts = [];
      var checkboxes = document.querySelectorAll('input[name="product_of_interest[]"]:checked');
  
      checkboxes.forEach(function(checkbox) {
        selectedProducts.push(checkbox.value);
      });
  
  
      document.getElementById('00ND2000002wTcS').value = selectedProducts.join(';');
    }
  
    const productCheckboxes = document.querySelectorAll('input[name="product_of_interest[]"]');
    productCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', updateProducts);
    });
  
    function updatePhoneNumber() {
      if (!countrySelect) return;
      const selectedOption = countrySelect.options[countrySelect.selectedIndex];
      const countryCode = selectedOption.getAttribute('data-calling-code');
  
      if (countryCode && mobileInput && phoneInput) {
        mobileInput.value = '+' + countryCode + ' ';
        phoneInput.value = '+' + countryCode + ' ';
      }
    }
  
    if (countrySelect) {
      countrySelect.addEventListener('change', updatePhoneNumber);
      updatePhoneNumber();
    }
  
  
    function setPreferedChannelRequired() {
      if (!preferredChannelSelect || !mobileInput || !phoneInput || !mobileLabel || !phoneLabel) return;
  
      const selectedChannel = preferredChannelSelect.value;
  
      mobileInput.required = false;
      phoneInput.required = false;
      mobileLabel.classList.remove('required');
      phoneLabel.classList.remove('required');
  
  
      if (selectedChannel === 'Email') {
        mobileInput.required = true;
        mobileLabel.classList.add('required');
      } else if (selectedChannel === 'WhatsApp') {
  
        phoneInput.required = true;
        phoneLabel.classList.add('required');
      } else {
  
      }
    }
  
  
    if (preferredChannelSelect) {
      preferredChannelSelect.addEventListener('change', setPreferedChannelRequired);
  
      setPreferedChannelRequired();
    }
  
  
  
    if (theForm) {
      theForm.addEventListener('submit', function(event) {
        let isValid = true;
        const checkboxes = document.querySelectorAll('input[name="product_of_interest[]"]');
        let atLeastOneChecked = false;
  
  
        checkboxes.forEach(checkbox => {
          if (checkbox.checked) {
            atLeastOneChecked = true;
          }
        });
  
  
  if (!atLeastOneChecked) {
    productErrorMessage.textContent = 'Please select at least one product of interest.';
    event.preventDefault();
    isValid = false;
  } else {
    productErrorMessage.textContent = ''; 
  }
  
  
        if (!isValid) {
          event.preventDefault();
          console.log("Form submission prevented due to validation errors.");
        } else {
          console.log("Form validation passed. Submitting...");
        }
  
  
      });
    } else {
      console.error("Form element not found.");
    }
  
  })();