
const SUPABASE_URL = 'https://iiiethnswnxjpdrnyzem.supabase.co';
const SUPABASE_KEY = 'sb_publishable_nPgK5VmY8WJFKj-nsP4RgQ_tSssKYNn';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Erreur ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error_description || errorMessage;
    } catch (e) {
      const textError = await response.text();
      errorMessage = textError || errorMessage;
    }
    console.error('Supabase API Error:', errorMessage);
    throw new Error(errorMessage);
  }
  return response.json().catch(() => true);
};

/**
 * Log d'une visite utilisateur
 */
export const logVisit = async () => {
  try {
    // Récupération IP via service externe simple
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    
    const userAgent = window.navigator.userAgent;
    let device = 'Desktop';
    if (/Mobi|Android/i.test(userAgent)) device = 'Mobile';
    else if (/Tablet|iPad/i.test(userAgent)) device = 'Tablette';

    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    const payload = {
      url: window.location.href,
      ip: ipData.ip || '0.0.0.0',
      device: device,
      browser: browser,
      source: document.referrer || 'Direct'
    };

    await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.warn('Visite non loggée:', error);
  }
};

/**
 * Récupération des statistiques globales pour l'admin
 */
export const getAdminStats = async () => {
  const fetchTable = (table: string) => fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, { headers }).then(handleResponse);
  
  const [visits, priceRequests, meetings, samples] = await Promise.all([
    fetchTable('visits'),
    fetchTable('price_grid_requests'),
    fetchTable('meeting_requests'),
    fetchTable('sample_requests')
  ]);

  return {
    visits,
    priceRequests,
    meetings,
    samples
  };
};

export const submitPriceGridRequest = async (data: { name: string, email: string, phone: string, categories: string[] }) => {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    categories: data.categories.join(', ')
  };
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/price_grid_requests`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};

export const submitMeetingRequest = async (data: { name: string, company: string, email: string, phone: string, meeting_date: string, message: string }) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/meeting_requests`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const submitSampleRequest = async (data: { name: string, company: string, email: string, phone: string, address: string, categories: string[], message: string }) => {
  const payload = {
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    address: data.address,
    categories: data.categories.join(', '),
    message: data.message
  };
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/sample_requests`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};
