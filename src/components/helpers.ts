export default function buildURL (baseURL: string, params: any) {
    const queryParams = [];
    for(const key in params){
      if(params[key]){
          queryParams.push(`${key}=${(params[key])}`)
      }
    }
    return `${baseURL}${queryParams.join('&')}`
  }