# PRÁCTICA 2 - PROGRAMA 15
# GEOMETRÍA: DISTANCIA ENTRE DOS PUNTOS 

import math

print("programa 2x15 - DISTANCIA ENTRE DOS PUNTOS")
print()

x1 = float(input("DAME LA COORDENADA x DEL PRIMER PUNTO: "))
y1 = float(input("DAME LA COORDENADA y DEL PRIMER PUNTO: "))
x2 = float(input("DAME LA COORDENADA x DEL SEGUNDO PUNTO: "))
y2 = float(input("DAME LA COORDENADA y DEL SEGUNDO PUNTO: "))

distancia = math.sqrt(math.pow((x2 - x1), 2) + math.pow((y2 - y1), 2))

print("La distancia entre los dos puntos es: %f" % (distancia))

print()

