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

const CORS_PROXY = 'https://corsproxy.io/?';

// Update dropdown color
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
  responseContent.textContent = '';
  
  // Force response section open
  responseDetails.open = true;

  let headers = {};
  let body = undefined;

  try {
    headers = JSON.parse(headersInput.value || '{}');
  } catch (err) {
    statusLine.textContent = 'Invalid Headers JSON';
    responseContent.textContent = 'Error: Please fix the Headers field — it must be valid JSON.';
    sendBtn.disabled = false;
    loadingSpinner.classList.remove('active');
    return;
  }

  if (['POST', 'PUT', 'PATCH'].includes(methodSelect.value)) {
    try {
      body = bodyInput.value.trim() ? JSON.parse(bodyInput.value) : undefined;
    } catch (err) {
      statusLine.textContent = 'Invalid Body JSON';
      responseContent.textContent = 'Error: Please fix the Body field — it must be valid JSON.';
      sendBtn.disabled = false;
      loadingSpinner.classList.remove('active');
      return;
    }
  }

  const targetUrl = CORS_PROXY + encodeURIComponent(urlInput.value.trim());

  try {
    const response = await fetch(targetUrl, {
      method: methodSelect.value,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const contentType = response.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    statusLine.textContent = `Status: ${response.status} ${response.statusText}`;
    
    // Always show something in response
    responseContent.textContent = typeof data === 'object' 
      ? JSON.stringify(data, null, 2) 
      : (data || 'No content returned');

  } catch (err) {
    statusLine.textContent = 'Request failed';
    responseContent.textContent = `Error: ${err.message || 'Network error or invalid URL'}\n\nCommon fixes:\n- Check if the URL is correct and public\n- Some APIs block proxy requests`;
    loadingSpinner.classList.remove('active');
    sendBtn.disabled = false;
  }
});