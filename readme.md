# 📊 Rastreador de Formularios Elementor Pro para GTM

![Versión](https://img.shields.io/badge/versión-1.0-blue.svg)
![Compatible ES5](https://img.shields.io/badge/ES5-compatible-green.svg)
![Listo GTM](https://img.shields.io/badge/GTM-listo-orange.svg)
![Licencia](https://img.shields.io/badge/licencia-MIT-green.svg)

> 🚀 **Solución potente de tracking para formularios Elementor Pro** - Captura automáticamente envíos de formularios y envía datos al dataLayer de Google Tag Manager para análisis avanzados.

Desarrollado por **[Convertiam.com](https://convertiam.com)** - Tus expertos en optimización de conversión 🎯

## ⚠️ **NOTA IMPORTANTE**
- El archivo `script.js` contiene **JavaScript puro** (sin etiquetas HTML)
- Al implementar en GTM **debes envolver el código con `<script>` y `</script>`**
- **NO uses** este script fuera de GTM sin las etiquetas correspondientes

---

## ✨ Características

- 🎯 **Detección Automática** - Intercepta envíos de formularios Elementor Pro sin problemas
- 🛡️ **Enfoque en Privacidad** - Filtra datos sensibles como tokens de reCAPTCHA
- 📊 **Datos Enriquecidos** - Captura datos del formulario, URL de página, timestamp y más
- 🔧 **Configuración Fácil** - Instalación simple copiar-pegar en GTM
- 🚫 **Seguro en Memoria** - Previene memory leaks con limpieza adecuada
- 🔒 **Resistente a Errores** - Maneja respuestas malformadas de manera elegante
- 📱 **Universal** - Funciona en todos los dispositivos y navegadores

## 🚀 Inicio Rápido

### 1. Instalación en GTM

1. Ve a tu contenedor de **Google Tag Manager**
2. Crea una nueva **Etiqueta HTML Personalizada**
3. Copia el contenido de [`script.js`](script.js) y **pégalo entre etiquetas `<script>`**:

```html
<script>
// Aquí va todo el contenido del archivo script.js
(function() {
    // ... código del script ...
})();
</script>
```

4. Configura el activador en **Todas las páginas** (o páginas específicas con formularios Elementor)
5. **Publica** tu contenedor

#### ⚠️ **IMPORTANTE**: 
- El archivo `script.js` contiene **solo JavaScript puro**
- En GTM debes **envolver el código con `<script>` y `</script>`**
- **NO** copies las etiquetas `<script>` si ya están en el archivo

### 2. Verificar Instalación

Abre la consola de desarrollador de tu navegador y envía un formulario Elementor Pro. Deberías ver un nuevo evento en el dataLayer:

```javascript
{
  event: 'elementor_form_submit',
  form_data: {
    post_id: "6ff3fa",
    form_id: "22",
    form_fields: {
      name: "Juan Pérez",                    // ← Campo nombre
      email: "test@convertiam.com",          // ← Campo email  
      tel: "666555666",                      // ← Campo teléfono
      message: "Solicito información"        // ← Campo mensaje
    }
  },
  page_url: 'https://tuweb.com/contacto',
  timestamp: 1751034067374,
  by: 'convertiam.com'
}
```

#### 🔍 Cómo Ver el dataLayer:
1. **F12** → **Consola**
2. Escribe: `dataLayer` y pulsa Enter
3. Busca el evento `elementor_form_submit`

## 📋 Qué Rastrea

### ✅ Datos Capturados Automáticamente

#### Información del Formulario:
- **ID de entrada** (`post_id`): "6ff3fa" 
- **ID de formulario** (`form_id`): "22"
- **URL de página** (`page_url`): Donde se envió
- **Timestamp** (`timestamp`): Momento exacto del envío

#### Campos del Formulario (`form_fields`):
- 📧 **Email**: `form_fields.email` → "test@convertiam.com"
- 📱 **Teléfono**: `form_fields.tel` → "666555666" 
- 👤 **Nombre**: `form_fields.name` → "Juan Pérez"
- 💬 **Mensaje**: `form_fields.message` → "Solicito información"
- ➕ **Cualquier otro campo** que tengas en tu formulario

### 🚫 Datos Filtrados
- `g-recaptcha-response` (optimización de privacidad y tamaño)
- Cualquier valor malformado o indefinido

### 📊 Estructura Completa del dataLayer
```javascript
{
  event: 'elementor_form_submit',           // ← Evento GTM
  form_data: {
    post_id: "6ff3fa",                      // ← ID entrada
    form_id: "22",                          // ← ID formulario
    form_fields: {                          // ← Datos capturados
      name: "Juan Pérez",                   // ← Accesible como {{Nombre Form}}
      email: "test@convertiam.com",         // ← Accesible como {{Email Form}}  
      tel: "666555666",                     // ← Accesible como {{Telefono Form}}
      message: "Solicito información"       // ← Accesible como {{Mensaje Form}}
    }
  },
  page_url: 'https://tuweb.com/contacto',   // ← URL donde se envió
  timestamp: 1751034067374,                 // ← Timestamp Unix
  by: 'convertiam.com'                      // ← Autoría
}
```

## 🔧 Configuración

El script viene preconfigurado para Elementor Pro, pero puedes personalizarlo:

```javascript
var CONFIG = {
    urlPattern: /.+\/admin-ajax\.php/,           // Endpoint AJAX de WordPress
    targetAction: 'elementor_pro_forms_send_form', // Acción de Elementor Pro
    eventName: 'elementor_form_submit'            // Nombre del evento GTM
};
```

## 🎯 Ejemplos de Integración GTM

### 📧 Acceso a Email y Teléfono en GTM

El script captura automáticamente **todos los campos del formulario**. Para acceder a email y teléfono en GTM:

#### Crear Variables en GTM:

1. **Variable Email**:
   - Tipo: `Variable de capa de datos`
   - Nombre: `form_data.form_fields[email]`
   - Valor por defecto: `No disponible`

2. **Variable Teléfono**:
   - Tipo: `Variable de capa de datos` 
   - Nombre: `form_data.form_fields[tel]`
   - Valor por defecto: `No disponible`

3. **Variable Nombre**:
   - Tipo: `Variable de capa de datos`
   - Nombre: `form_data.form_fields[name]`
   - Valor por defecto: `No disponible`

#### Ejemplo dataLayer Real:
```javascript
{
  event: 'elementor_form_submit',
  form_data: {
    post_id: "6ff3fa",
    form_id: "22", 
    form_fields: {
      name: "Juan Pérez",
      email: "test@convertiam.com",  // ← Usa {{Email Form}}
      tel: "666555666",             // ← Usa {{Telefono Form}}
      message: "Solicito información"
    }
  },
  page_url: 'https://mrbogart.com/contacto',
  timestamp: 1751034067374,
  by: 'convertiam.com'
}
```

### 🎯 Casos de Uso Prácticos

#### 1. Envío a Google Analytics 4
```javascript
// Etiqueta GA4 - Evento Personalizado
gtag('event', 'form_submit', {
  form_id: '{{form_data.form_id}}',
  user_email: '{{Email Form}}',        // Variable GTM
  page_location: '{{Page URL}}',
  contact_method: 'form'
});
```

#### 2. Pixel de Facebook con Email
```javascript
// Etiqueta HTML Personalizada
<script>
fbq('track', 'Lead', {
  content_name: 'Formulario Contacto',
  content_category: '{{form_data.form_id}}', 
  value: 1,
  currency: 'EUR'
}, {
  email: '{{Email Form}}'  // Email hasheado automáticamente
});
</script>
```

#### 3. Envío a CRM (Webhook)
```javascript
// Etiqueta HTML Personalizada
<script>
fetch('https://tu-crm.com/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: '{{Email Form}}',
    telefono: '{{Telefono Form}}',
    nombre: '{{Nombre Form}}',
    fuente: 'Web - {{Page URL}}',
    fecha: new Date().toISOString()
  })
});
</script>
```

### 📊 Configuración Avanzada GTM

#### Activador Específico por Formulario
```javascript
// Activador: Evento personalizado = elementor_form_submit
// Condición: form_data.form_id equals "contacto-comercial"
```

#### Audiencia Personalizada GA4
```javascript
// Crear audiencia: "Usuarios que enviaron formulario"
// Condición: event_name = "form_submit"
// Lookback: 30 días
```

## 🛠️ Detalles Técnicos

### Cómo Funciona

1. **Intercepta XMLHttpRequest** - Sobrescribe el objeto XMLHttpRequest global
2. **Monitorea Llamadas AJAX** - Observa llamadas a `admin-ajax.php` de WordPress
3. **Valida Datos del Formulario** - Verifica acciones específicas de Elementor Pro
4. **Procesa Éxito** - Solo se activa en envíos exitosos de formularios
5. **Envía al dataLayer** - Manda datos estructurados a GTM

### Compatibilidad Navegadores
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Internet Explorer 11+
- ✅ Navegadores móviles (iOS Safari, Chrome Mobile)

### Impacto en Rendimiento
- **Sobrecarga mínima** - Solo procesa peticiones AJAX relevantes
- **Eficiente en memoria** - Limpia automáticamente event listeners
- **No bloqueante** - No interfiere con la funcionalidad del formulario

## 👥 Guía Para Principiantes (Sin Conocimientos Técnicos)

### 🔧 Paso a Paso: Configurar Variables de Formulario

#### 1. Crear Variable de Email
1. En GTM, ve a **Variables** → **Nueva**
2. **Nombre**: `Email Form`
3. **Tipo de variable**: Variable de capa de datos
4. **Nombre de variable de capa de datos**: `form_data.form_fields.email`
5. **Guardar**

#### 2. Crear Variable de Teléfono  
1. **Variables** → **Nueva**
2. **Nombre**: `Telefono Form`
3. **Tipo**: Variable de capa de datos
4. **Nombre**: `form_data.form_fields.tel`
5. **Guardar**

#### 3. Crear Variable de Nombre
1. **Variables** → **Nueva** 
2. **Nombre**: `Nombre Form`
3. **Tipo**: Variable de capa de datos
4. **Nombre**: `form_data.form_fields.name`
5. **Guardar**

### 📊 Crear Objetivo en Google Analytics

#### Paso 1: Crear Etiqueta GA4
1. **Etiquetas** → **Nueva**
2. **Nombre**: `GA4 - Lead Form Submit`
3. **Tipo**: Evento de Google Analytics GA4
4. **ID de medición**: Tu ID de GA4 (G-XXXXXXX)
5. **Nombre del evento**: `form_lead`
6. **Parámetros del evento**:
   - `form_email`: `{{Email Form}}`
   - `form_phone`: `{{Telefono Form}}`
   - `form_name`: `{{Nombre Form}}`
   - `page_title`: `{{Page Title}}`

#### Paso 2: Configurar Activador
1. **Activadores** → **Nuevo**
2. **Nombre**: `Elementor Form Success`
3. **Tipo**: Evento personalizado
4. **Nombre del evento**: `elementor_form_submit`
5. **Guardar**

#### Paso 3: Asignar y Publicar
1. En la etiqueta GA4, asignar el activador
2. **Vista previa** para probar
3. **Enviar** para publicar

### 🎯 Verificar que Funciona

#### En GTM Vista Previa:
1. Activa **Vista previa**
2. Ve a tu web y envía un formulario
3. En GTM deberías ver:
   - ✅ Evento: `elementor_form_submit`
   - ✅ Variables pobladas con datos reales

#### En Google Analytics:
1. Ve a **Informes** → **Eventos en tiempo real**
2. Deberías ver el evento `form_lead`
3. Con los parámetros de email, teléfono, etc.

### ❓ Solución de Problemas Comunes

**❌ "Las variables están vacías"**
- Verifica que los nombres de campos coincidan
- Los campos más comunes son: `email`, `tel`, `phone`, `name`, `nombre`

**❌ "No veo el evento en GA4"**
- Revisa que el ID de medición sea correcto
- Verifica que la etiqueta se active en Vista previa

**❌ "Funciona en Vista previa pero no en vivo"**
- Asegúrate de haber **publicado** los cambios
- Espera 5-10 minutos para ver datos en GA4

## 🔍 Solución de Problemas

### Problemas Comunes

**❌ ¿Los eventos no se disparan?**
- ✅ Verifica que Elementor Pro esté instalado y los formularios configurados
- ✅ Confirma que el script está en una **Etiqueta HTML Personalizada** (no JavaScript Personalizado)
- ✅ Asegúrate de haber añadido `<script>` y `</script>` alrededor del código
- ✅ Verifica que la etiqueta se active en páginas con formularios

**❌ ¿Faltan datos del formulario?**
- ✅ Revisa la consola del navegador (F12) por errores
- ✅ Verifica que dataLayer esté inicializado: escribe `dataLayer` en consola
- ✅ Prueba con el modo **Vista previa** de GTM
- ✅ Comprueba que los nombres de campos coincidan (ej: `email` vs `e-mail`)

**❌ ¿Variables GTM vacías?**
- ✅ Los nombres de campos más comunes son: `email`, `tel`, `phone`, `name`, `nombre`
- ✅ Verifica en dataLayer el nombre exacto: `form_fields.email` vs `form_fields.e-mail`
- ✅ Usa el **modo Vista previa** para ver qué datos llegan exactamente

**❌ ¿Eventos duplicados?**
- ✅ El script incluye prevención para múltiples inicializaciones
- ✅ Verifica que no lo hayas instalado varias veces
- ✅ Revisa que no tengas otros scripts similares activos

### 🛠️ Herramientas de Debug

#### Ver dataLayer en Vivo:
```javascript
// Abrir consola (F12) y escribir:
dataLayer
// Buscar eventos tipo: "elementor_form_submit"
```

#### Ver Variables GTM:
```javascript
// En Vista previa GTM, buscar en Variables:
// - Email Form
// - Telefono Form  
// - Nombre Form
```

### Modo Debug

Habilita logging de debug modificando el script:

```javascript
// Añade esta línea después de CONFIG
var DEBUG = true;
```

## 🤝 Contribuir

¡Damos la bienvenida a contribuciones! Por favor consulta nuestras [Guías de Contribución](CONTRIBUTING.md).

### Configuración de Desarrollo

1. Haz fork del repositorio
2. Crea una rama de característica: `git checkout -b feature/caracteristica-increible`
3. Prueba tus cambios exhaustivamente
4. Envía un pull request

## 📈 Casos de Uso Avanzados

### Formularios Multi-Paso
Rastrea pasos individuales de formularios complejos:

```javascript
// Activador personalizado para pasos de formulario
if (formData.current_step) {
  dataLayer.push({
    event: 'form_step_completed',
    step: formData.current_step,
    form_id: formData.form_id
  });
}
```

### Integración A/B Testing
```javascript
// Incluir datos de experimento
{
  event: 'elementor_form_submit',
  experiment_id: '{{Experiment ID}}',
  variant: '{{Variant Name}}',
  form_data: { /* campos formulario */ }
}
```

## 📊 Mejores Prácticas de Analytics

### Configuración Recomendada GTM

1. **Crear Dimensiones Personalizadas** para IDs de formulario
2. **Configurar Objetivos** para diferentes tipos de formulario
3. **Configurar Audiencias** basadas en interacciones con formularios
4. **Habilitar Conversiones Mejoradas** para mejor atribución

### Estructura de Eventos GA4
```javascript
gtag('event', 'form_submit', {
  form_id: '{{form_data.form_id}}',
  page_location: '{{Page URL}}',
  engagement_time_msec: 1000
});
```

## 🏢 Acerca de Convertiam

**[Convertiam.com](https://convertiam.com)** es una agencia líder en optimización de conversión especializada en:

- 🎯 **Optimización de Tasa de Conversión**
- 📊 **Implementación de Analytics Avanzados**
- 🧪 **A/B Testing y Experimentación**
- 📈 **Automatización de Marketing**
- 🔍 **Optimización de Experiencia de Usuario**

*Transforma a los visitantes de tu web en clientes con estrategias basadas en datos.*

### 🚀 Nuestros Servicios

#### 📊 Auditorías CRO Completas
Análisis profundo de tu embudo de conversión para identificar oportunidades de mejora.

#### 🧪 Testing y Experimentación
Diseño e implementación de tests A/B y multivariados para optimizar conversiones.

#### 📈 Implementación Analytics
Configuración avanzada de Google Analytics, GTM y herramientas de tracking.

#### 🎯 Optimización de Landing Pages
Mejora del diseño y contenido de páginas de aterrizaje para maximizar conversiones.

---

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Equipo de Elementor por el increíble page builder
- Comunidad de Google Tag Manager
- Todos los contribuidores y testers

---

<div align="center">
  <strong>Hecho con ❤️ por <a href="https://convertiam.com">Convertiam.com</a></strong>
  <br>
  <sub>Ayudando a empresas a optimizar conversiones desde 2020</sub>
</div>

## 📞 Soporte

¿Necesitas ayuda implementando o personalizando este rastreador? 

**Obtén Soporte Experto:**
- 🌐 Visita [convertiam.com](https://convertiam.com)
- 📧 Email: info@convertiam.com
- 💬 Agenda una consulta gratuita
- 📱 WhatsApp: +34 XXX XXX XXX

### 💼 Consultoría Especializada

Nuestro equipo de expertos puede ayudarte con:

- ✅ **Implementación completa del tracking**
- ✅ **Configuración avanzada de GTM**
- ✅ **Análisis de datos y reporting**
- ✅ **Optimización continua de conversiones**
- ✅ **Formación de tu equipo interno**

---

## 🌟 Casos de Éxito

> *"Gracias a Convertiam implementamos tracking avanzado que nos permitió aumentar nuestras conversiones un 47% en 3 meses"*
> 
> **— Cliente E-commerce, Madrid**

> *"Su experiencia en GTM y analytics nos ahorró meses de trabajo interno"*
> 
> **— Startup SaaS, Barcelona**

---

⭐ **Dale estrella a este repositorio** si te ayudó a rastrear mejor tus formularios Elementor!

## 🔄 Actualizaciones y Roadmap

### Versión Actual: 1.0
- ✅ Tracking básico Elementor Pro
- ✅ Filtrado de reCAPTCHA
- ✅ Manejo de errores robusto

### Próximas Versiones
- 🔄 **v1.1** - Soporte Contact Form 7
- 🔄 **v1.2** - Integración WooCommerce forms
- 🔄 **v2.0** - Dashboard de analytics incluido

---

## 🏆 Por Qué Elegir Esta Solución

### ✅ Ventajas vs Alternativas

| Característica | Nuestro Script | Plugins Premium | Soluciones Custom |
|----------------|----------------|-----------------|-------------------|
| **Costo**      | Gratuito        | €50-200/año | €1000+ desarrollo |
| **Rendimiento**| Mínimo impact   | Sobrecarga plugins | Variable |
| **Personalización** | Total control | Limitada | Total |
| **Soporte**    | github | Limitado | Dependes del dev |
| **Actualizaciones** | GitHub    | Automáticas | Manual |


---

¿Listo para llevar tu tracking al siguiente nivel? **[Contáctanos hoy](https://convertiam.com/contacto)** 🚀