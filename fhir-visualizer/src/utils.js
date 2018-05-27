import sortby from 'lodash.sortby';

export function hashCode(str) { 
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

export function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

export function luma(color) {
    var rgb = parseInt(color, 16);   
    var r = (rgb >> 16) & 0xff;  
    var g = (rgb >>  8) & 0xff; 
    var b = (rgb >>  0) & 0xff; 

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

   return luma;
}

export function hexToHSL(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

   
    return { h, s, l };
  }


    export function processEvents(data) {
        const {
            encounters,
            medicationRequests,
            observations,
            procedures,
            diagnosticReports,
            conditions,
        } = data;
        
        const events = encounters.map((encounter) => {
            const event = { ...encounter };
            const eventObservations = observations
                .filter(observ => observ.context && observ.context.reference.split('/')[1] ===  encounter.id);
            const eventProcedures = procedures
                .filter(procedure => procedure.context && procedure.context.reference.split('/')[1] ===  encounter.id);
            const eventDiagnosticReports = diagnosticReports
                .filter(report => report.context && report.context.reference.split('/')[1] ===  encounter.id);
            const eventConditions = conditions
                .filter(condition => condition.context && condition.context.reference.split('/')[1] == encounter.id);
            const eventMedicationRequests = medicationRequests
                .filter(request => request.context && request.context.reference.split('/')[1] == encounter.id);
            
            event.observations = eventObservations;
            event.medicationRequests = eventMedicationRequests;
            event.procedures = eventProcedures;
            event.conditions = eventConditions;
            event.diagnosticReports = eventDiagnosticReports;

            return event;
        })

        const sorted = sortby(events, 'period.start')
            .filter(event => 
                event.observations.length ||
                event.medicationRequests.length ||
                event.procedures.length ||
                event.conditions.length ||
                event.diagnosticReports.length);
        return sorted;
    } 
