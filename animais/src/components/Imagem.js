import React from 'react'

const Imagem = ({pic, key, alt, imgStyle}) => {
  return (
    <div 
      className={`flex justify-content-center ${imgStyle}`} 
      key={key}>
      <img src={pic} alt={alt} />
    </div>
  )
}

export default Imagem
