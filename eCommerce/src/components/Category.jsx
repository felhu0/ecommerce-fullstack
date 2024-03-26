


export const Category = ({onCategorySelect}) => {

 
  const categories = ['laptop', 'mobiltelefoner', 'TV', 'dammsugare']

  const handleCategory = category => {
    onCategorySelect(category);
    console.log('clicked',category)
  }




  
  return (
       <>
             <ul className=' w3-bar-item category-menu'>
                {categories.map(category => (
                    <li key={category} onClick={() => handleCategory(category)} className={`w3-button ${category.toLowerCase}`}>
                     {category}</li>
                ))}
                
               
            </ul>
      

       </>
       
  )
}