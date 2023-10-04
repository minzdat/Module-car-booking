import * as XLSX from 'xlsx/xlsx.mjs'
class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error)
        })
    }
    static exportExcel(data, nameSheet, nameFile) {
        return new Promise((resolve, reject) => {
            var wb = XLSX.utils.book_new()
            var ws = XLSX.utils.json_to_sheet(data)
    
            // Set column width
            ws['!cols'] = [{ wch: 40 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }];
    
            // Set cell font and background color
            ws['A1'].s = {
                font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } },
                fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } }
            };
    
            XLSX.utils.book_append_sheet(wb, ws, nameSheet)
            XLSX.writeFile(wb, `${nameFile}.xlsx`)
            resolve('oke')
        })
    }
    
}

export default CommonUtils;