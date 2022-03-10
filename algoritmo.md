# Pasos a seguir Algoritmo
## Algoritmo para separar operadores de los operandos

1.  Leer contenido del archivo y decodificarlo a utf-8 ✅
2.  Quitar comentarios de línea completa y en una linea con tratamiento para ver que no este dentro de una cadena el comentario remplazandolo por un espacio ✅
3.  Quitar líneas vacías y múltiples espacios ✅
4.  Segundo contar y quitar operandos de cadenas de texto no considerar cadenas múltilinea ni comentarios múltilinea ✅
5.  Buscar operandos de números con regex definidos por ahora en index.js ✅
6.  Buscar parentesis y corchetes que abren y cierran ✅
7.  Busqueda de operadores con símbolos no alfanumericos
	- Buscar operadores de 3 símbolos con los siguientes regex remplazandolos por un espacio por ahora en operadores.js
	- Buscar operadores de 2 símbolos con los siguientes regex remplazandolos por un espacio por ahora en operadores.js
	- Buscar operadores de 1 símbolos con los siguientes regex remplazandolos por un espacio por ahora en operadores.js
8.  Buscar operadores de definición de función con su return (si es que tiene) remplazandolos por un espacio
9. Buscar operadores de funciones propias del lenguaje (python)
10. Buscar palabras reservadas con los siguientes regex remplazandolos por un espacio
11. Todo lo restante serán operandos
