import React from 'react';
import p from'./paginated.module.css'

function Paginated({postsPerPage, totalPosts, paginate}) {
  const pageNumbers = [];

  for(let i =1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
      pageNumbers.push(i);
  }
    return (
      <nav > 
          <ul className= {p.paginated}>
              {pageNumbers.map((n,i )=> (
                  <div className = {p.center}>
                  <li key={i }>
                      <button className={p.numberStyles} onClick ={ () => paginate(n)} >
                          {n}
                      </button>
                  </li>
                  </div>
              ))}
          </ul>
      </nav>
    
    );
  }
  
  export default Paginated; 