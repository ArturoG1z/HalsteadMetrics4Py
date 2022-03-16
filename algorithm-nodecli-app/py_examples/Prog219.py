# PRÁCTICA 2 - PROGRAMA 19
# GEOMETRÍA: ÁREA DE UN TRIÁNGULO

import math

print("programa 2x19 - ÁREA DE UN TRIÁNGULO")
print()

x1 = float(input("DAME LA COORDENADA x DEL PRIMER PUNTO: "))
y1 = float(input("DAME LA COORDENADA y DEL PRIMER PUNTO: "))
x2 = float(input("DAME LA COORDENADA x DEL SEGUNDO PUNTO: "))
y2 = float(input("DAME LA COORDENADA y DEL SEGUNDO PUNTO: "))
x3 = float(input("DAME LA COORDENADA x DEL TERCER PUNTO: "))
y3 = float(input("DAME LA COORDENADA y DEL TERCER PUNTO: "))

side1 = math.sqrt(math.pow((x2 - x1), 2) + math.pow((y2 - y1), 2))
side2 = math.sqrt(math.pow((x3 - x2), 2) + math.pow((y3 - y2), 2))
side3 = math.sqrt(math.pow((x1 - x3), 2) + math.pow((y1 - y3), 2))

s = (side1 + side2 + side3) / 2

area = math.sqrt(s * (s - side1) * (s - side2) * (s - side3))

print()
print("El área del triángulo es: %f" % (area))
print()

