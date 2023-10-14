export default {
    name:'task',
    title:'Task',
    type: 'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type: 'string'
        },       
        {
            name:'userId',
            title:'UserId',
            type: 'string'
        },
        {
            name:'completed',
            title:'Completed',
            type: 'boolean'
        },       
        {
            name: 'currentDate',
            title: 'currentDate',
            type: 'string',
            options: {
                dateFormat: 'YYYY-MM-DD',                
              }
          },         
          {
            name: 'createdAt',
            title: 'CreatedAt',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',                
              }
          },      
    ]

}