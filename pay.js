paymentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // ... (previous form handling code)

  try {
    // 1. Upload receipt to your Python backend
    const uploadRes = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData
    });
    const { url: receiptUrl } = await uploadRes.json();

    // 2. Verify payment
    const verifyRes = await fetch('http://localhost:5000/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receipt_url: receiptUrl,
        account_type: accountType.value,
        quantity: parseInt(quantity.value),
        email: email.value
      })
    });
    
    const verification = await verifyRes.json();
    
    if (verification.success) {
      showStatus('✅ Payment verified!', 'success');
      // Redirect to success page
    } else {
      showStatus(`❌ ${verification.message}`, 'error');
    }

  } catch (error) {
    showStatus('⚠️ Network error. Please try again', 'warning');
  }
});