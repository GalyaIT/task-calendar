export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };
  

  export const userTasksQuery = (userId) => {
    const query = `*[_type == "task" && userId == '${userId}']{  
      _id,
       title, 
       completed,
       currentDate,       
       createdAt     
    }`;

    return query;
  };
