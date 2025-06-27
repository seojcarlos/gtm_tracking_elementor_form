/**
 * Elementor Pro Form Tracker - ES5 Compatible para GTM
 * Versión: 1.0
 * Autor: convertiam.com by Juan Carlos
 * 
 * Descripción: Script que intercepta formularios de Elementor Pro enviados via AJAX
 * y envía los datos al dataLayer de GTM cuando el envío es exitoso.
 * 
 * Funcionamiento:
 * - Intercepta XMLHttpRequest globalmente
 * - Detecta llamadas a admin-ajax.php con action "elementor_pro_forms_send_form"
 * - Extrae datos del FormData (excluyendo g-recaptcha-response)
 * - Envía evento "elementor_form_submit" al dataLayer cuando el formulario es exitoso
 */

(function() {
    // Prevenir múltiples inicializaciones
    if (window.elementorTrackerInit) return;
    window.elementorTrackerInit = true;
    
    var origXMLHttpRequest = XMLHttpRequest;
    var CONFIG = {
        urlPattern: /.+\/admin-ajax\.php/,
        targetAction: 'elementor_pro_forms_send_form',
        eventName: 'elementor_form_submit'
    };
    
    // Función para extraer datos de FormData de forma segura
    function extractFormData(formData) {
        var data = {};
        var excludeFields = ['g-recaptcha-response'];
        
        try {
            // Verificar que forEach existe
            if (formData && typeof formData.forEach === 'function') {
                formData.forEach(function(value, key) {
                    // Filtrar campo específico g-recaptcha-response
                    var shouldExclude = false;
                    
                    for (var i = 0; i < excludeFields.length; i++) {
                        if (key === excludeFields[i]) {
                            shouldExclude = true;
                            break;
                        }
                    }
                    
                    if (!shouldExclude) {
                        data[key] = value;
                    }
                });
            }
        } catch (error) {
            // Error silencioso para no romper la página
        }
        
        return data;
    }
    
    // Función para obtener acción del FormData
    function getFormAction(formData) {
        var action = null;
        try {
            if (formData && typeof formData.forEach === 'function') {
                formData.forEach(function(value, key) {
                    if (key === 'action') {
                        action = value;
                    }
                });
            }
        } catch (error) {
            // Error silencioso
        }
        return action;
    }
    
    // Nueva implementación de XMLHttpRequest
    XMLHttpRequest = function() {
        var xhr = new origXMLHttpRequest();
        var requestURL = '';
        var requestData = null;
        var origOpen = xhr.open;
        var origSend = xhr.send;
        
        // Override open
        xhr.open = function(method, url) {
            requestURL = url || '';
            return origOpen.apply(this, arguments);
        };
        
        // Override send  
        xhr.send = function(data) {
            requestData = data;
            
            // Solo procesar si coincide con patrón y es FormData
            if (CONFIG.urlPattern.test(requestURL) && 
                data instanceof FormData) {
                
                var formAction = getFormAction(data);
                
                // Solo procesar si es la acción que buscamos
                if (formAction === CONFIG.targetAction) {
                    
                    // Handler para la respuesta
                    var handleResponse = function() {
                        // Usar readystatechange en lugar de load para mayor control
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            try {
                                var response;
                                try {
                                    response = JSON.parse(xhr.responseText);
                                } catch (parseError) {
                                    // Si falla el JSON, salir silenciosamente
                                    return;
                                }
                                
                                // Verificar que response existe y tiene success
                                if (response && response.success === true) {
                                    var formData = extractFormData(requestData);
                                    
                                    var eventData = {
                                        event: CONFIG.eventName,
                                        form_data: formData,
                                        page_url: window.location.href,
                                        timestamp: new Date().getTime(),
                                        by: 'convertiam.com'
                                    };
                                    
                                    // Push seguro al dataLayer
                                    try {
                                        window.dataLayer = window.dataLayer || [];
                                        window.dataLayer.push(eventData);
                                    } catch (dataLayerError) {
                                        // Error silencioso si dataLayer falla
                                    }
                                }
                            } finally {
                                // IMPORTANTE: Limpiar el listener para evitar memory leaks
                                xhr.removeEventListener('readystatechange', handleResponse);
                            }
                        }
                    };
                    
                    // Usar readystatechange en lugar de load
                    xhr.addEventListener('readystatechange', handleResponse);
                }
            }
            
            return origSend.apply(this, arguments);
        };
        
        return xhr;
    };
      
    for (var prop in origXMLHttpRequest) {
        if (origXMLHttpRequest.hasOwnProperty(prop)) {
            XMLHttpRequest[prop] = origXMLHttpRequest[prop];
        }
    }
    XMLHttpRequest.prototype = origXMLHttpRequest.prototype;
    
})();
