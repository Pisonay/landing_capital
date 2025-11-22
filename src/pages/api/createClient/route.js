export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { fname, lname, email, phone, project_id } = req.body;

  // Validación de campos requeridos
  if (!fname || !lname || !email || !phone) {
    return res.status(400).json({ 
      error: 'Campos requeridos faltantes',
      required: ['fname', 'lname', 'email', 'phone'],
    });
  }

  // Configuración de la API de Sperant
  const SPERANT_API_URL = 'https://api.eterniasoft.com/v3/clients';
  const SPERANT_TOKEN = 'i3Jg3O0KPR5xDxrQldli81Gl3humFMOU6MlytsNyAccesos';

  const payload = {
    data: {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      ...(project_id && { project_id: project_id }),
    },
  };

  try {
    const response = await fetch(SPERANT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SPERANT_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error de Sperant:', result);
      return res.status(response.status).json({ 
        error: 'Error en la solicitud a Sperant',
        details: result,
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Cliente registrado exitosamente',
    data: result,
    });

  } catch (error) {
    console.error('Error de conexión:', error);
    return res.status(500).json({ 
      error: 'Error de conexión con el servidor',
      details: error.message, 
    });
  }
}
