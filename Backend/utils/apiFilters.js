class APIFilters{   
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword=this.queryStr.keyword? {
           name:{
            $regex: this.queryStr.keyword,    //regex will help to search in the  name of the product that is in the DB.it will not exactly match the name with the keyword,if in a line there is a keyword that matches then it will show the result//
            $options:"i",     //this search is going to be case insensitive,you pass any name in  capital or small,it doesnt matter//
        } // $regex and $options are the operators provided by the mongoose//
        } : {};
      this.query=this.query.find({...keyword});
      return this
    }

   filters(){
    const queryCopy={...this.queryStr};
     
    //fields to remove//
    const fieldsToRemove=["keyword","page"];
    fieldsToRemove.forEach((el)=>delete queryCopy[el]);

   //advance filter for price, ratings etc//
    
      let queryStr=JSON.stringify(queryCopy);
      queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`);     //g means a global search,, /b means that it will match the entire word//

    this.query=this.query.find(JSON.parse(queryStr));    //to convert it into json format//
    return this; 
   }

   pagination(resPerPage){            //this func. allows you to go to page you wish to go//
    const currentPage=Number(this.queryStr.page) || 1 ;
    const skip= resPerPage* (currentPage-1);    //if there is for eg. 10 results in a page and we have to go to next page then we have to skip first 10 data// 
     
    this.query=this.query.limit(resPerPage).skip(skip);    //skip func of mongoose used to skip x amount of results//
    return this;
}
    
}

export default APIFilters;