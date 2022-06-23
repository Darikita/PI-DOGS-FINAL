
export const filDogies = (str, arr) => {
  let aux = [];
   for(let i = 0; i<arr.length; i++) {
     if(arr[i].temperaments){ 
        if(arr[i].temperaments.filter(e => e.includes(str) === true ).length > 0) {
          aux.push(arr[i])
        } 
         
   }
   else {return 'no existe ese temperament'}
  }
    return aux
  }

  
        


export const sorts = (str, arr) => {
  
    
     if(str === 'a-z') {
       return arr.sort((unaMascota, otraMascota) => unaMascota.name.localeCompare(otraMascota.name))
   }
  if(str === 'z-a') {
    return arr.sort((unaMascota, otraMascota) => otraMascota.name.localeCompare(unaMascota.name))    
  }
  if(str === 'highest score' ) {
     return arr.sort((unaMascota, otraMascota) => otraMascota.score - unaMascota.score);
  }
  if(str === 'lowest score' ) {
     return arr.sort((unaMascota, otraMascota) => unaMascota.score - otraMascota.score);
  }
    if (str === '...') {
      return arr;
  }
  };




