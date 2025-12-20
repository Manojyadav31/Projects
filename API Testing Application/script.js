const form = document.getElementById('api-form');
const urlInput = document.getElementById('api-url');
const methodSelect = document.getElementById('api-method');
const headersInput = document.getElementById('api-headers');
const bodyInput = document.getElementById('api-body');
const statusLine = document.getElementById('status-line');
const responseContent = document.getElementById('response-content');
const sendBtn = document.getElementById('send-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const responseDetails = document.getElementById('response-details');

// Update method dropdown color
function updateMethodColor() {
  const method = methodSelect.value.toLowerCase();
  methodSelect.className = method;
}
methodSelect.addEventListener('change', updateMethodColor);
updateMethodColor();

// Auto-resize textareas
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}
[headersInput, bodyInput].forEach(ta => {
  ta.addEventListener('input', () => autoResize(ta));
  autoResize(ta);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  sendBtn.disabled = true;
  statusLine.textContent = 'Sending request...';
  loadingSpinner.classList.add('active');
  responseContent.innerHTML = '';  // Clear previous content
  responseDetails.open = true;

  let headers = {};
  let body = undefined;

  try {
    headers = JSON.parse(headersInput.value || '{}');
  } catch (err) {
    statusLine.textContent = 'Invalid Headers JSON';
    responseContent.textContent = 'Please fix the Headers field (must be valid JSON)';
    sendBtn.disabled = false;
    loadingSpinner.classList.remove('active');
    return;
  }

  if (['POST', 'PUT', 'PATCH'].includes(methodSelect.value)) {
    try {
      body = bodyInput.value.trim() ? JSON.parse(bodyInput.value) : undefined;
    } catch (err) {
      statusLine.textContent = 'Invalid Body JSON';
      responseContent.textContent = 'Please fix the Body field (must be valid JSON)';
      sendBtn.disabled = false;
      loadingSpinner.classList.remove('active');
      return;
    }
  }
  
  try {
    const res = await fetch('/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: urlInput.value.trim(),
        method: methodSelect.value,
        headers,
        body
      })
    });

    const data = await res.json();

    // Display status
    if (data.status) {
      statusLine.textContent = `Status: ${data.status} ${data.statusText || ''}`;
      statusLine.style.color = data.status < 400 ? '#10b981' : '#ef4444';
    } else if (data.error) {
      statusLine.textContent = 'Proxy Error';
      statusLine.style.color = '#ef4444';
    }

    // Pretty print the actual response data
    const fullJson = JSON.stringify(data.data || data, null, 2);
    const lines = fullJson.split('\n');

    // If more than 20 lines → show truncated + expand button
    if (lines.length > 30) {
      const truncated = lines.slice(0, 30).join('\n');
      responseContent.innerHTML = `
        <pre class="truncated">${truncated}\n<span class="expand-hint">...\n(click to expand full ${lines.length} lines)</span></pre>
      `;

      responseContent.addEventListener('click', function expand() {
        responseContent.innerHTML = `<pre>${fullJson}</pre>`;
        responseContent.removeEventListener('click', expand);
      });
    } else {
      // Short response → show full
      responseContent.innerHTML = `<pre>${fullJson}</pre>`;
    }

  } catch (err) {
    statusLine.textContent = 'Network Error';
    statusLine.style.color = '#ef4444';
    responseContent.textContent = 'Failed to reach backend. Is the server running?';
  } finally {
    loadingSpinner.classList.remove('active');
    sendBtn.disabled = false;
  }
});