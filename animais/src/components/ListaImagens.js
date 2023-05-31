import React from 'react'
import Imagem from 'components/Imagem'

const ListaImagens = ({pics, imgStyle}) => {
  return (
    pics.map((pic, key) => (
      <Imagem
        imgStyle={imgStyle} 
        pic={pic.src.small}
        key={pic.id}
        alt={pic.alt}
      />
    ))
  )
}

export default ListaImagens