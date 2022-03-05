# Pasos a seguir Algoritmo inicial
1.  Algoritmo para separar operadores de los operandos
2.  Leer contenido del archivo y decodificarlo a utf-8
3.  Primero quitar comentarios de una linea, con tratamiento para ver que no este dentro de una cadena el comentario remplazandolo por un espacio
5.  Quitar lineas vacias y multiples espacios
6.  Segundo contar y quitar operandos de cadenas de texto no considerar cadenas multilinea ni comentarios multilinea
7.  Buscar operandos de numeros con regex definidos por ahora en index.js
8.  Buscar parentesis y corchetes que habren y cierran
9.  Buscar operadores de definicion de funcion con su return (si es que tiene) remplazandolos por un espacio
10. Buscar operadores de 3 simbolos con los siguientes regex remplazandolos por un espacio por ahora en operadores.js
11. Buscar operadores de 2 simbolos con los siguientes regex remplazandolos por un espacio por ahora en operadores.js
12. Buscar operadores de 1 simbolos con los siguientes regex remplazandolos por un espacio por ahora en operadores.js
13. Buscar palabras reservadas con los siguientes regex remplazandolos por un espacio
14. Todo lo restante serán operandos
