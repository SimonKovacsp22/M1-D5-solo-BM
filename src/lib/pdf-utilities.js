import PdfPrinter from "pdfmake"

export const getPDFReadableStream = product => {
    const fonts = {
      Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
      },
    }
  
    const printer = new PdfPrinter(fonts)
 

  
    const docDefinition = {
        content: [
           {
            text: [product.name, product.category, product.brand, product.description, product.price]
        },
        {
			image: "/public/images/undefined.jpeg"
		}
            
        
        ]
        
    }
  
    const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
    pdfReadableStream.end()
  
    return pdfReadableStream
  }