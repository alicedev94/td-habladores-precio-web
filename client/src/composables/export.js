import readXlsxFile from 'read-excel-file'
var sapCode = []

export const standardStorePdf = async (api, portApi, data1, list1, sizeTalker1, promo1) => {
    try {
        const response = await fetch(`http://${api}:${portApi}/api/v1/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data1,
                list: list1,
                sizeTalker: sizeTalker1,
                promo: promo1
            })
        });

        if (!response.ok) {
            throw new Error('Error al generar el PDF');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const fecha = new Date();
        const fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}_${fecha.getHours().toString().padStart(2, '0')}-${fecha.getMinutes()}`;
        const nombreArchivo = `Hablador-Precio${fechaFormateada}.pdf`;

        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        a.click();
    } catch (error) {
        console.error(error);
        alert('Error al generar el PDF');
        // isLoadingPdf.value = false;
    }
};

export const standardStoreXlsx = async (api, portApi, event, data1, list, sucur, size) => {
    try {
        const rows = await readXlsxFile(event.target.files[0]);
        sapCode = [rows];

        const response = await fetch(`http://${api}:${portApi}/api/v1/send/sap-code/${list}/${sucur}/${size}`, {
            method: 'POST',
            timeout: 120000,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sapCode: sapCode
            })
        });

        const data = await response.json();

        if (data.status !== "ok") {
            alert(data.descrip);
        } else {
            data1 = data1.concat(data.data);
            return data1;
        }
    } catch (error) {
        alert(error);
    } 
};
