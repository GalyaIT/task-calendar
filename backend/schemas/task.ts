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
            title: 'CurrentDate',
            type: 'string',
            options: {
                dateFormat: 'YYYY-MM-DD',                
              }
          },         
          {
            name: 'currentTime',
            title: 'CurrentTime',
            type: 'string',
            options: {
                timeFormat: 'HH:mm',                
              }
          },      
    ]

}