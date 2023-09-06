import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import rounded from './rouded';

interface Params {
  client: {
    email: string,
  },
  invoice: {
    id: string,
    createdAt: string,
    products: [
      {
        id: string,
        name: string,
        quantity: number,
        price: number
      }
    ],
    total: number,
    status: string


  }

}

export default function getPdf(params:Params) {
    const doc = new jsPDF();
  console.log(params.client);
    const sum = params.invoice.products.reduce(
      (accumulator: number, currentValue: any) => accumulator + (currentValue.price * currentValue.quantity),
      0
    )
    autoTable(doc, {
      body: [
        [
          {
            content: 'Hoodsy',
            styles: {
              halign: 'left',
              fontSize: 18,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Invoice',
            styles: {
              halign: 'right',
              fontSize: 18,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#111827'
      }
    });

    autoTable(doc, {
      body: [
        [
          
          {
            content: 'To:'
            +`\n${params.client.email}`
            +'\n Payment Status:'
            +`\n${params.invoice.status}`,
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'From:'
            +'\nHoodsyn Arg'
            ,
            styles: {
              halign: 'left'
            }
          },
        ],
      ],
      theme: 'plain'
    });


    autoTable(doc, {
      head: [['#', 'Name', 'Quantity', 'Unit Price', 'Subtotal']],
      body: 
        params.invoice.products.map((item,i)=>{
          const producto = [
            i+1, item.name, item.quantity,`$${rounded(item.price)}`, `$${rounded(item.price*item.quantity)}`
          ]
          return producto
        })
        

        
      ,
      theme: 'striped',
      headStyles:{
        fillColor: '#111827'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content:`Subtotal: $ ${rounded(sum)} `,
            styles:{
              halign:'right'
            }
          },
          
        ],
        
        
        [
          {
            content: `Total: $${rounded(params.invoice.total)}`,
            styles:{
              halign:'right'
            }
          },
          
        ],
      ],
      theme: 'plain',
      styles: {
        halign:'right'
      }
    });
    

    

    

    return doc.save(`${params.client.email} - ${params.invoice.createdAt}`);
}