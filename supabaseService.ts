const SUPABASE_URL = 'https://iiiethnswnxjpdrnyzem.supabase.co';
const SUPABASE_KEY = 'sb_publishable_nPgK5VmY8WJFKj-nsP4RgQ_tSssKYNn';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Fonction utilitaire pour gérer les réponses de l'API Supabase
 */
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
  return true;
};

/**
 * Enregistre une demande d'accès à la grille tarifaire (Table: price_grid_requests)
 */
export const submitPriceGridRequest = async (data: { name: string, email: string, categories: string[] }) => {
  const payload = {
    name: data.name,
    email: data.email,
    categories: data.categories.join(', ') // Conversion du tableau en string pour la colonne TEXT
  };
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/price_grid_requests`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};

/**
 * Enregistre une demande de rendez-vous (Table: meeting_requests)
 */
export const submitMeetingRequest = async (data: { name: string, company: string, email: string, location: string, message: string }) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/meeting_requests`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

/**
 * Enregistre une demande d'échantillons (Table: sample_requests)
 */
export const submitSampleRequest = async (data: { name: string, company: string, email: string, address: string, categories: string[], message: string }) => {
  const payload = {
    name: data.name,
    company: data.company,
    email: data.email,
    address: data.address,
    categories: data.categories.join(', '), // Conversion du tableau en string
    message: data.message
  };
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/sample_requests`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};
