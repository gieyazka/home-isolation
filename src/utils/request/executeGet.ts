import handleFetchError from './handleFetchError';

const executeGet = (request: RequestInfo): Promise<any> =>
{ 
  console.log(5,request);
  
  return(
  
  fetch(request)
    .then(res => {
      // console.log(11,res);
      
      return res.json()})
    .catch(handleFetchError)
)};

export default executeGet;
