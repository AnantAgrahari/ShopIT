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
    const fieldsToRemove=["keyword"];
    fieldsToRemove.forEach((el)=>delete queryCopy[el]);

   //advance filter for price, ratings etc//
    
      let queryStr=JSON.stringify(queryCopy);
      queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`);

      console.log("======");
    console.log(queryCopy);
    console.log("=====");
   
    this.query=this.query.find(this.queryStr);
    return this; 
   }

}

export default APIFilters;