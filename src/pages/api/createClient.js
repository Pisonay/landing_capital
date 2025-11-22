// API Endpoint para integración con Sperant CRM (Astro + Vercel)
// Endpoint: POST /api/createClient
export const prerender = false;

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { fname, lname, email, phone, document } = body;

    // Validación de campos requeridos
    if (!fname || !lname || !email || !phone) {
      return new Response(
        JSON.stringify({ 
          error: 'Campos requeridos faltantes',
          required: ['fname', 'lname', 'email', 'phone'],
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Configuración de la API de Sperant
    const SPERANT_API_URL = 'https://api.eterniasoft.com/v3/clients';
    const SPERANT_TOKEN = 'i3Jg3O0KPR5xDxrQldli81Gl3humFMOU6MlytsNy';

    const payload = {
        fname: fname,
        lname: lname,
        email: email,
        document: document,
        phone: `+51 ${phone}`,
        document_type: 'DNI',
        input_channel_id: 19,
        source_id: 22,
        interest_type_id: 5,
        project_id: 570,
        'utm-source': 'Googleads',
        utm_medium: 'Googleads',
    };

    const response = await fetch(SPERANT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': SPERANT_TOKEN,
        'Accept': '*/*',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error de Sperant:', result);
      return new Response(
        JSON.stringify({ 
          error: 'Error en la solicitud a Sperant',
          details: result,
        }),
        { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Cliente registrado exitosamente',
        data: result,
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error de conexión:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error de conexión con el servidor',
        details: error.message,
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
